import fs from 'fs'
import path from 'path'
import { PluginContext } from 'rollup'

const SOURCE_REGEX = /@source\((.*?)\)/gmi
const CONTENT_REGEX = /@content\((.*?)\)/gmi

export function emitSources(pluginContext: PluginContext, code: string) {
  const assetsSrc = [...code.matchAll(SOURCE_REGEX)]
  assetsSrc.forEach(([_, src]) => {
    pluginContext.emitFile({
      id: src,
      type: 'chunk',
    })
  })
}

export function emitContents(pluginContext: PluginContext, code: string) {
  const assetsSrc = [...code.matchAll(CONTENT_REGEX)]
  assetsSrc.forEach(([_, src]) => {
    pluginContext.emitFile({
      id: src,
      type: 'chunk',
    })
  })
}

export function assetName(options, assetInfo) {
  const defaultPattern = () => {
    if (typeof options.assetFileNames === 'function') {
      return options.assetFileNames(assetInfo)
    }
    return options.assetFileNames || 'assets/[name]-[hash].[ext]'
  }

  if (!assetInfo.name) return defaultPattern();

  let extType = path.extname(assetInfo.name)
  if (extType && /.css/i.test(extType)) {
    return 'styles/[name]-[hash].[ext]';
  }
  return defaultPattern();
}
