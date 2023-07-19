import fs from 'fs'
import path from 'path'
import { PluginContext } from 'rollup'
import { withLeadingSlash } from 'ufo'

const ASSET_SCRIPT_REGEX = /@asset\((.*)\)/gmi
const ASSET_CSS_REGEX = /<style(.*)@asset\((.*)\)(.*)><\/style>/gmi

export function getAssetsManifest() {
  if (!fs.existsSync('output/client/manifest.json')) {
    throw new Error(`
      No assets manifest found.
      Please, build client before server to generate the assets manifest
    `)
  }
  return JSON.parse(fs.readFileSync('output/client/manifest.json', 'utf-8'))
}

export function emitScripts(pluginContext: PluginContext, code: string) {
  const assetsSrc = [...code.matchAll(ASSET_SCRIPT_REGEX)]
  assetsSrc.forEach(([_, src]) => {
    if (src.endsWith('.ts')) {
      pluginContext.emitFile({
        id: src,
        type: 'chunk',
      })
    }
  })
}

export function emitCss(pluginContext: PluginContext, code: string) {
  const assetsSrc = [...code.matchAll(ASSET_CSS_REGEX)]
  assetsSrc.forEach(([_, _attr1, src, _attr2]) => {
    if (src.endsWith('.css')) {
      pluginContext.emitFile({
        id: src,
        type: 'chunk',
      })
    }
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

export function transformScript(code, manifest) {
  const replaced = code.replace(ASSET_SCRIPT_REGEX, (_string, g1) => {
    if (g1.endsWith('.ts')) {
      const file = withLeadingSlash(manifest[g1].file)
      const src = `src="${file}"`
      return src
    }
    return _string
  })

  return replaced
}

export function transformCss(code, manifest) {
  const replaced = code.replace(ASSET_CSS_REGEX, (_string, g1, g2, g3) => {
    if (g2.endsWith('.css')) {
      const source = fs.readFileSync(`output/client/${manifest[g2].file}`, 'utf-8')
      return `<style ${g1.trim()} ${g3.trim()}>${source}</style>`
    }
    return _string
  })

  return replaced
}