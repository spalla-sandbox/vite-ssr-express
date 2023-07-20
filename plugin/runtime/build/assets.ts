import fs from 'fs'
import path from 'path'
import { PluginContext } from 'rollup'
import { withLeadingSlash } from 'ufo'

const ASSET_REGEX = /@asset\((.*)\)/gmi
const SCRIPT_REGEX = /(['"`]?)<script(.*)@asset\((.*?)\)(.*)><\\\/script>(['"`]?)/gmi
const STYLE_REGEX = /(['"`]?)<style(.*)@asset\((.*)\)(.*)><\/style>(['"`]?)/gmi

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
  const assetsSrc = [...code.matchAll(ASSET_REGEX)]
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
  const assetsSrc = [...code.matchAll(ASSET_REGEX)]
  assetsSrc.forEach(([_, src]) => {
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
  const replaced = code.replace(SCRIPT_REGEX, (_string, _g1, g2, g3, g4) => {
    if (g3.endsWith('.ts')) {
      const file = withLeadingSlash(manifest[g3].file)
      return `\`<script ${g2.trim()} ${g4.trim()} src="${file}"></script>\``
    }
    return _string
  })
  return replaced
}

export function transformCss(code, manifest) {
  const replaced = code.replace(STYLE_REGEX, (_string, _g1, g2, g3, g4) => {
    if (g3.endsWith('.css')) {
      const source = fs.readFileSync(`output/client/${manifest[g3].file}`, 'utf-8')
      return `\`<style ${g2.trim()} ${g4.trim()}>${source}</style>\``
    }
    return _string;
  })

  return replaced
}