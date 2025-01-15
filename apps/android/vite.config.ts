import { sveltekit } from '@sveltejs/kit/vite'
import tailwindcss from '@tailwindcss/vite'
import { internalIpV4Sync } from 'internal-ip'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [sveltekit(), tailwindcss()],
  clearScreen: false,
  server: {
    host: true,
    strictPort: true,
    port: 14141,
    hmr: {
      protocol: 'ws',
      port: 14142,
      host: internalIpV4Sync()
    }
  },
  envDir: '../../',
  envPrefix: ['VITE_', 'TAURI_']
})
