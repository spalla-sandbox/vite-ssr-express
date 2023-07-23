import path from 'path';
import { ConfigEnv, PluginOption } from 'vite';
import { emitContents, emitScripts, emitSources } from './runtime/build/assets';
import { getPages } from './runtime/build/pages';

/**
 * Helps to emit assets to bundle on build step
 * @returns Plugin configuration
 */
export default function assetBuild(): PluginOption {
  let envConfig: ConfigEnv;
  return {
    name: 'vite-build-plugin',
    enforce: 'post',
    apply: 'build',
    config(_, env) {
      envConfig = env;
    },
    options(options) {
      if (!envConfig.ssrBuild) {
        const inputs: any = [];
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
      }
      return null;
    },
    generateBundle(_options, bundle) {
      if (!envConfig.ssrBuild) {
        const keys = Object.keys(bundle);
        keys.forEach(key => {
          if (key.includes('page')) {
            // eslint-disable-next-line no-param-reassign
            delete bundle[key];
          }
        });
      }
    },
    transform(code: string) {
      if (!envConfig.ssrBuild) {
        emitScripts(this, code);
        emitSources(this, code);
        emitContents(this, code);
      }
    },
  };
}
