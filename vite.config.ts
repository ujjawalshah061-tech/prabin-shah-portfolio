import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Expose the dev and preview servers on the local network (other devices on the same Wi-Fi)
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
})
