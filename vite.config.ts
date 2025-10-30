import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import vike from 'vike/plugin'
import { defineConfig } from "vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [vike(), react(), tailwindcss()],
  server: { host: true, port: 5173 },
  preview: { host: true, port: 5173 },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
