import { PluginOption, ResolvedConfig } from "vite"
import { withLeadingSlash } from 'ufo'

export default function assetScriptDev(): PluginOption {
  let config: ResolvedConfig
  return {
    name: 'vite-dev-plugin',
    apply: 'serve',
    configResolved(resolvedConfig) {
      // store the resolved config
      config = resolvedConfig
    },
    transform(code) {
      return {
        code: code.replace(/@asset\((.*)\)/gmi, (_string, group) => {
          if (group.endsWith('.ts')) {
            return `type="module" src="${withLeadingSlash(group)}"`
          }
          return _string
        })
      }
    }
  }
}