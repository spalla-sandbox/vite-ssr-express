import assetScriptBuild from "./assetScriptBuild";
import assetScriptDev from "./assetScriptDev";

export default function VitePlugin() {
  return [
    assetScriptBuild(),
    assetScriptDev()
  ]
}