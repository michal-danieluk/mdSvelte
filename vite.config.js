import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite'

export default defineConfig({
  plugins: [sveltekit()],
  // allows vite access to ./posts
  server: {
    fs: {
      allow: ['./']
    }
  },
  optimizeDeps: {
    exclude: ['@steeze-ui/heroicons', '@steeze-ui/svelte-icon']
  }
})
