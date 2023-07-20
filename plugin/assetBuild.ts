import { ConfigEnv, PluginOption } from 'vite'
import { getPages } from './runtime/build/pages'
import {
  assetName,
  emitContents,
  emitSources
} from './runtime/build/assets'

export default function assetBuild(): PluginOption {
  let envConfig: ConfigEnv | undefined;
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
          emitSources(this, code)
          emitContents(this, code)
        })
      }
    }
  }
}
