/// <reference types="vitest" />
import { defineConfig } from 'vite';
import viteTsConfigPaths from 'vite-tsconfig-paths';
import baseVite from '../../../vite.base';

export default defineConfig({
  ...baseVite,
  cacheDir: '../../../node_modules/.vite/header',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [
    viteTsConfigPaths({
      root: '../../../',
    }),
  ],

  build: {
    rollupOptions: {
      input: {
        index: '/src/main.tsx',
      },
      output: {
        format: 'system',
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name][ext]',
        globals: {
          'single-spa': 'singleSpa',
          'single-spa-layout': 'singleSpaLayout',
        },
      },
      preserveEntrySignatures: 'strict',
      external: ['single-spa', 'single-spa-layout', 'store'],
    },
  },

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [
  //    viteTsConfigPaths({
  //      root: '../../../',
  //    }),
  //  ],
  // },

  test: {
    globals: true,
    cache: {
      dir: '../../../node_modules/.vitest',
    },
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
});
