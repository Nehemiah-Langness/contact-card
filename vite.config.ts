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
      background_color: '#212529',
      short_name: 'Contact Card',
      description: 'Build a contact card on your mobile device',
      theme_color: '#222587',
      icons: [
        {
          src: 'icon-192.svg',
          sizes: '192x192',
          type: 'image/svg'
        },
        {
          src: 'icon-512.svg',
          sizes: '512x512',
          type: 'image/svg'
        }
      ]
    }
  })],
  server: {
    port: 5000,
  },
  base: "/contact-card/"
})
