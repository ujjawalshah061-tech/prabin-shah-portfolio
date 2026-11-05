import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const api = { '/api': 'http://localhost:5050' }

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // host: true exposes the site to other devices on the same network.
  // /api is forwarded to the mail server (server/index.js).
  server: { host: true, port: 5173, proxy: api },
  preview: { host: true, port: 4173, proxy: api },
})
