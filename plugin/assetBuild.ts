import { ConfigEnv, PluginOption } from 'vite'
import { getPages } from './runtime/build/pages'
import {
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
    buildStart() {
      if (!envConfig?.ssrBuild) {
        getPages().forEach(({ code }) => {
          emitSources(this, code)
          emitContents(this, code)
        })
      }
    },
    writeBundle(_options, bundle) {
      if (bundle['manifest.json']) {
        // upload do bucket files
      }
    }
  }
}
