import build from "./build";

export default function VitePlugin() {
  return [
    build()
  ]
}