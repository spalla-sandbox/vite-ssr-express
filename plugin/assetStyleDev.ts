import { PluginOption, ResolvedConfig } from "vite"
import fs from 'fs'

export default function assetStyleDev(): PluginOption {
  let config: ResolvedConfig
  return {
    name: 'vite-style-dev-plugin',
    apply: 'serve',
    configResolved(resolvedConfig) {
      // store the resolved config
      config = resolvedConfig
    },
    transform(code, id) {
      console.log(id)
      return {
        code: code.replace(/<style(.*)@asset\((.*)\)(.*)><\/style>/gmi, (_string, g1, g2, g3) => {
          return `<style ${g1.trim()} ${g3.trim()}>${fs.readFileSync(g2).toString()}</style>`
        })
      }
    }
  }
}