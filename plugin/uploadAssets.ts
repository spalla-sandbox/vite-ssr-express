import { ConfigEnv, PluginOption } from 'vite'

/**
 * Helps to upload assets to a bucket
 * Updates manifest.json with assets URL
 * @returns Plugin configuration
 */
export default function uploadAssets(): PluginOption {
  let envConfig: ConfigEnv;
  return {
    name: 'vite-upload-plugin',
    enforce: 'post',
    apply: 'build',
    config(_, env) {
      envConfig = env
    },
    writeBundle(_options, bundle) {
      if (!envConfig.ssrBuild && bundle['manifest.json']) {
        // upload do bucket files
      }
    }
  }
}
