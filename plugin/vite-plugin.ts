import build from "./build";
import dev from "./dev";

export default function VitePlugin() {
  return [
    build(),
    dev()
  ]
}