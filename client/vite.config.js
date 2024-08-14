import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/user': {
        target: 'http://localhost:8000',
        secure: false,
      },
      '/employee': {
        target: 'http://localhost:8000',
        secure: false 
      },
      '/report': {
        target: 'http://localhost:8000',
        secure: false 
      },
      '/department': {
        target: 'http://localhost:8000',
        secure: false 
      }
    }
  },
  plugins: [react()],
})
