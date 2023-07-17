import assetScriptBuild from "./assetScriptBuild";
import assetScriptDev from "./assetScriptDev";
import assetStyleBuild from "./assetStyleBuild";
import assetStyleDev from "./assetStyleDev";

export default function VitePlugin() {
  return [
    assetScriptDev(),
    assetStyleDev(),
    assetScriptBuild(),
    assetStyleBuild(),
  ]
}