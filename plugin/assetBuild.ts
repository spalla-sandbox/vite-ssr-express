import { ConfigEnv, PluginOption } from 'vite'
import { getPages } from './runtime/build/pages'
import {
  emitContents,
  emitSources
} from './runtime/build/assets'

/**
 * Helps to emit assets to bundle on build step
 * @returns Plugin configuration
 */
export default function assetBuild(): PluginOption {
  let envConfig: ConfigEnv;
  return {
    name: 'vite-build-plugin',
    enforce: 'post',
    apply: 'build',
    config(_, env) {
      envConfig = env
    },
    options(options) {
      if (!envConfig.ssrBuild) {
        options.input = undefined
        return options
      }
    },
    buildStart() {
      if (!envConfig.ssrBuild) {
        getPages().forEach(({ code }) => {
          emitSources(this, code)
          emitContents(this, code)
        })
      }
    },
  }
}
