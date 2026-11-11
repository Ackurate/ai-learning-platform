import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    // Gọi /api/... sẽ được chuyển sang backend, tránh lỗi CORS khi dev
    proxy: { '/api': 'http://localhost:5000' },
  },
})
