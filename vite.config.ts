import { defineConfig } from "vite";
import VitePlugin from "./plugin";

export default defineConfig({
  plugins: [
    VitePlugin(),
  ],
  build: {
    manifest: true,
  }
})