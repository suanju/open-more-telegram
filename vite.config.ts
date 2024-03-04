import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import electron from 'vite-plugin-electron/simple'
import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    electron({
      main: {
        entry: 'electron/main.ts',
      },
      preload:{
        input: 'electron/preload.ts',
      }
    })
  ],
  build: {
    rollupOptions: {
      external: ['electron', 'electron/renderer']
    }
  },
  resolve: {
    alias: {
      '@': join(__dirname, "src"),
    }
  }
})
