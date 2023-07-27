import { defineConfig } from 'vite';
import VitePlugin from './plugin';

export default defineConfig({
  plugins: [VitePlugin()],
  build: {
    manifest: true,
  },
  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === 'js') {
        return filename.replace(/assets\//gim, './');
      }
      return filename;
    },
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: `
      import { h } from "nano-jsx"; 
      import { Fragment } from "nano-jsx";
    `,
  },
});
