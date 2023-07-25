import { PluginOption } from 'vite';

/**
 * Helps to upload assets to a bucket
 * Updates manifest.json with assets URL
 * @returns Plugin configuration
 */
export default function uploadAssets(): PluginOption {
  return {
    name: 'vite-upload-plugin',
    /**
     * Make plugin run post others plugins
     */
    enforce: 'post',
    /**
     * Run plugin only in build and in client build
     */
    apply(_, { command, ssrBuild }) {
      return command === 'build' && !ssrBuild;
    },
    /**
     * When is writing the manifest.json
     * Read and upload the files if necessary to CDN
     */
    writeBundle(_options, bundle) {
      if (bundle['manifest.json']) {
        // upload do bucket files
      }
    },
  };
}
