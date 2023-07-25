import fs from 'fs';
import path from 'path';
import { PluginContext } from 'rollup';

const SOURCE_REGEX = /@source\((.*?)\)/gim;
const CONTENT_REGEX = /@content\((.*?)\)/gim;
const CHUNKS_EXT = ['.css', '.ts'];

/**
 * Emits the @source files to Rollup generates the chunk
 */
export function emitSources(pluginContext: PluginContext, code: string) {
  const assetsSrc = [...code.matchAll(SOURCE_REGEX)];
  assetsSrc.forEach(([_, params]) => {
    const [src] = params.split(',');
    /**
     * For .ts and .css files we emit as chunk
     */
    if (CHUNKS_EXT.includes(path.extname(src))) {
      pluginContext.emitFile({
        id: src,
        type: 'chunk',
      });
    } else {
      /**
       * For other files we emit as asset.
       *
       * NOTICE: When vite generates the manifest it use the name
       * as path. And the file is write to output/client/assest/src/.../image-[hash].gif
       *
       * A workarount for this is in ouputOptions in assetBuild.ts file in Vite plugin.
       */
      pluginContext.emitFile({
        source: fs.readFileSync(src),
        name: src,
        type: 'asset',
      });
    }
  });
}

/**
 * Emits the @content files to Rollup generates the chunk
 */
export function emitContents(pluginContext: PluginContext, code: string) {
  const assetsSrc = [...code.matchAll(CONTENT_REGEX)];
  assetsSrc.forEach(([_, src]) => {
    pluginContext.emitFile({
      id: src,
      type: 'chunk',
    });
  });
}
