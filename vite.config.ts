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
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-motion'
          }
          if (id.includes('node_modules/@radix-ui')) {
            return 'radix'
          }
          if (id.includes('node_modules/@supabase')) {
            return 'supabase'
          }
        }
      }
    }
  }
})
