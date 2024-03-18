import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'autoUpdate', devOptions: {
      enabled: true
    },
    includeAssets: ['favicon.svg'],
    manifest: {
      name: 'Contact Card',
      short_name: 'Contact Card',
      description: 'Build a contact card on your mobile device',
      theme_color: '#2272af',
      background_color: '#f8f9fa',
      icons: [
        {
          src: 'logo192x192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: 'logo512x512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    }
  })],
  server: {
    port: 5000,
  },
  base: "/"
})
