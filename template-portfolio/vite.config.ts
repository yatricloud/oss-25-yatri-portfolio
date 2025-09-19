import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: true
  },
  define: {
    // Make environment variables available at build time
    'import.meta.env.VITE_USER_ID': JSON.stringify(process.env.VITE_USER_ID || ''),
    'import.meta.env.VITE_PROFILE_DATA': JSON.stringify(process.env.VITE_PROFILE_DATA || '{}')
  }
})
