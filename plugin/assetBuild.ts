import { ConfigEnv, PluginOption } from 'vite'
import { getPages } from './runtime/build/pages'
import {
  assetName,
  getAssetsManifest,
  emitCss,
  emitScripts,
  transformCss,
  transformScript
} from './runtime/build/assets'

export default function assetBuild(): PluginOption {
  let envConfig: ConfigEnv | undefined;
  let manifest: Object;
  return {
    name: 'vite-script-build-plugin',
    enforce: 'post',
    apply: 'build',
    config(_, env) {
      envConfig = env
    },
    options(options) {
      if (!envConfig?.ssrBuild) {
        options.input = undefined
        return options
      }
    },
    outputOptions(options) {
      return {
        ...options,
        assetFileNames(assetInfo) {
          return assetName(options, assetInfo)
        },
      }
    },
    buildStart() {
      if (!envConfig?.ssrBuild) {
        getPages().forEach(({ code }) => {
          emitScripts(this, code)
          emitCss(this, code)
        })
      } else {
        manifest = getAssetsManifest()
      }
    },
    transform(code, _id, options) {
      if (options?.ssr) {
        let transformed = transformScript(code, manifest)
        transformed = transformCss(transformed, manifest)
        return {
          code: transformed
        }
      }
    },
  }
}