import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // ...
    forceRerunTriggers: ['**/src/**'],
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
