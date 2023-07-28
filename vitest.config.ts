import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // ...
    forceRerunTriggers: ['**/src/**'],
  },
  esbuild: {
    jsxInject: `
      import React from 'react';
    `,
  },
});
