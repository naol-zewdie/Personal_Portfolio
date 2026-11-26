import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: 'es2020',
    // The lazily loaded 3D robot chunk (three.js) is ~1 MB; it never blocks first paint.
    chunkSizeWarningLimit: 1100,
    rollupOptions: {
      output: {
        manualChunks: {
          motion: ['framer-motion'],
        },
      },
    },
  },
})
