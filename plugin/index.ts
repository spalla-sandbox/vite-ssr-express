import assetBuild from "./assetBuild";
import assetDev from "./assetDev";

export default function VitePlugin() {
  return [
    assetDev(),
    assetBuild(),
  ]
}