import { PluginOption } from "vite"
import fs from 'fs'

export default function assetStyleDev(): PluginOption {
  return {
    name: 'vite-style-dev-plugin',
    apply: 'serve',
    transform(code, id) {
      return {
        code: code.replace(/<style(.*)@asset\((.*)\)(.*)><\/style>/gmi, (_string, g1, g2, g3) => {
          return `<style ${g1.trim()} ${g3.trim()}>${fs.readFileSync(g2, 'utf-8')}</style>`
        })
      }
    }
  }
}