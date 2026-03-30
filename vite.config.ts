import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // или vue, если у вас Vue

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
})
