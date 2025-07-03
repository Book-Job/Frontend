import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import rollupNodePolyFill from 'rollup-plugin-node-polyfills'
export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: false,
      pwaAssets: {
        disabled: false,
        config: true,
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },
      devOptions: {
        enabled: true,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    }),
  ],
  define: {
    global: 'globalThis',
  },

  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          global: true,
        }),
      ],
    },
  },

  build: {
    rollupOptions: {
      plugins: [rollupNodePolyFill()],
    },
  },

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
  },
})
