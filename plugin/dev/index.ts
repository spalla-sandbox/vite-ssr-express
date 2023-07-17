import { PluginOption, ResolvedConfig } from "vite"
import { withLeadingSlash } from 'ufo'

export default function dev(): PluginOption {
  let config: ResolvedConfig
  return {
    name: 'vite-dev-plugin',
    configResolved(resolvedConfig) {
      // store the resolved config
      config = resolvedConfig
    },
    transform(code) {
      if (config.command === 'serve') {
        return {
          code: code.replace(/@asset\((.*)\)/gmi, (_, group) => {
            return `type="module" src="${withLeadingSlash(group)}"`
          })
        }
      }
    }
  }
}