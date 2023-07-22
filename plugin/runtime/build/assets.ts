import fs from 'fs';
import path from 'path';
import { PluginContext } from 'rollup';

const SOURCE_REGEX = /@source\((.*?)\)/gim;
const CONTENT_REGEX = /@content\((.*?)\)/gim;
const SCRIPT_REGEX = /@script\((.*?)\)/gim;
const ASSETS_EXT = ['.gif', '.jpg', '.jpeg', '.png', '.webp', '.mp4', '.mp3'];

export function emitSources(pluginContext: PluginContext, code: string) {
  const assetsSrc = [...code.matchAll(SOURCE_REGEX)];
  assetsSrc.forEach(([_, params]) => {
    const [src] = params.split(',');
    if (ASSETS_EXT.includes(path.extname(src))) {
      pluginContext.emitFile({
        source: fs.readFileSync(src),
        name: src,
        fileName: `assets/${path.basename(src)}`,
        type: 'asset',
      });
    } else {
      pluginContext.emitFile({
        id: src,
        type: 'chunk',
      });
    }
  });
}

export function emitContents(pluginContext: PluginContext, code: string) {
  const assetsSrc = [...code.matchAll(CONTENT_REGEX)];
  assetsSrc.forEach(([_, src]) => {
    pluginContext.emitFile({
      id: src,
      type: 'chunk',
    });
  });
}

export function emitScripts(pluginContext: PluginContext, code: string) {
  const assetsSrc = [...code.matchAll(SCRIPT_REGEX)];
  assetsSrc.forEach(([_, params]) => {
    const [src] = params.split(',');
    pluginContext.emitFile({
      id: src,
      type: 'chunk',
    });
  });
}
