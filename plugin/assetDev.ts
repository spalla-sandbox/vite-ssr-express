import { PluginOption } from "vite"
import { transformDevCss, transformDevScript } from "./runtime/dev/assets"

export default function assetDev(): PluginOption {
  return {
    name: 'vite-script-dev-plugin',
    apply: 'serve',
    transform(code) {
      let transformed = transformDevScript(code)
      transformed = transformDevCss(transformed)
      return {
        code: transformed
      }
    }
  }
}