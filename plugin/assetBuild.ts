import path from 'path';
import { PluginOption } from 'vite';
import { emitContents, emitSources } from './runtime/build/assets';
import { getPages } from './runtime/build/pages';

/**
 * Helps to emit assets to bundle on build step
 * @returns Plugin configuration
 */
export default function assetBuild(): PluginOption {
  return {
    name: 'vite-build-plugin',
    /**
     * Make plugin run post others plugins
     */
    enforce: 'post',
    /**
     * Run plugin only in build and in client build
     */
    apply(_, { command, ssrBuild }) {
      return command === 'build' && !ssrBuild;
    },
    /**
     * Search for pages files and include as input for client build
     * then search by @source and @content to be emitted
     */
    options(options) {
      const inputs: Array<Array<string>> = [];
      getPages().forEach(({ src }) => {
        inputs.push([
          path.relative(
            'src',
            src.slice(0, src.length - path.extname(src).length),
          ),
          src,
        ]);
      });
      return {
        ...options,
        input: Object.fromEntries(inputs),
      };
    },
    /**
     * Handle when there assets that is not .TS or .CSS like
     * images and videos.
     *
     * When we emit this kind of file, Vite cannot correctly handle the path to write the chunk.
     *
     * There a limitation and this is the workaround.
     */
    outputOptions(options) {
      return {
        ...options,
        assetFileNames(asset) {
          // When is another than ts or css
          if (!asset.name?.endsWith('.ts') && !asset.name?.endsWith('.css')) {
            /**
             * When we emit this kine of file, the name is like 'src/.../image.gif'
             *
             * The name must be like this to Vite write correctly the manifest.json file
             *
             * But the name also is used as path to write in 'output/client/assets' directory
             *
             * So, here, we change this using only the file name as path to write
             *
             * If the asset has name, we get only the name of the respective file
             * without extension.
             *
             * And we return the pattern to rollup write in correctly place and name.
             */
            if (asset.name)
              return `assets/${path.parse(asset.name).name}-[hash].[ext]`;
          }
          return 'assets/[name]-[hash].[ext]';
        },
      };
    },
    /**
     * The page file must be out of bundle once they are functions
     * called in SSR and don't need to be in client bundle
     */
    generateBundle(_options, bundle) {
      const sources = Object.keys(bundle);
      sources.forEach(src => {
        if (src.includes('page')) {
          // eslint-disable-next-line no-param-reassign
          delete bundle[src];
        }
      });
    },
    /**
     * Search by @source and @content to be emitted in related files
     */
    transform(code: string) {
      emitSources(this, code);
      emitContents(this, code);
    },
  };
}
