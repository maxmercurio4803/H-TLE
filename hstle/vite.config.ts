import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  build: {
    outDir: 'dist',  // Output directory for the build
    rollupOptions: {
      input: 'index.html',  // Entry point for your app
    },
  },
});
