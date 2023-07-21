import { PluginOption } from "vite"
import { transformContent, transformSource } from "./runtime/transform"

export default function assetDev(): PluginOption {
  return {
    name: 'vite-script-dev-plugin',
    apply: 'serve',
    transform(code, id) {
      if (!id.includes('.page.')) return
      let transformed = transformSource(code, 'type="module"')
      transformed = transformContent(transformed)
      return {
        code: transformed
      }
    }
  }
}