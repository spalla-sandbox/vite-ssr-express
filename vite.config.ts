import { defineConfig } from "vite";
import VitePlugin from "./plugin";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from "@rollup/plugin-commonjs";

export default defineConfig({
  plugins: [
    VitePlugin(),
  ],
  build: {
    rollupOptions: {
      plugins:[
        commonjs(),
        nodeResolve({
          browser: true,
          modulesOnly: true
        }),
        replace({
          preventAssignment: false,
          values:{
            'process.browser': 'true',
          },
        }),
      ]
    }
  }
})