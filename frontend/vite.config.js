import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // allow access from network/IP
    port: 5173,
    allowedHosts:['084eb4afdcd8.ngrok-free.app'],
  }
})
