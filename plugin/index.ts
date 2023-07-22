import assetBuild from "./assetBuild";
import uploadAssets from "./uploadAssets";

/**
 * A plugin that brings together others plugins that helps de development and build
 * @returns Array with plugins to help application to run/build
 */
export default function VitePlugin() {
  return [
    assetBuild(),
    uploadAssets(),
  ]
}