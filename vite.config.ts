import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve } from 'path';

// Custom plugin to ensure _redirects exists in the dist folder for Cloudflare Pages
const cloudflareRedirectsPlugin = () => ({
  name: 'generate-redirects',
  closeBundle() {
    const outDir = resolve(__dirname, 'dist');
    // Ensure dist directory exists
    if (!existsSync(outDir)) {
      mkdirSync(outDir, { recursive: true });
    }
    // Create the _redirects file with exact required content
    writeFileSync(resolve(outDir, '_redirects'), '/*    /index.html   200');
    console.log('\n✅ Success: Created dist/_redirects for Cloudflare Pages SPA support.');
  }
});

export default defineConfig({
  plugins: [
    react(),
    cloudflareRedirectsPlugin() as any
  ],
  base: './', // CRITICAL: Fixes white screen/infinite loading on sub-domains
  define: {
    // Injects the API key from environment during build time
    'process.env.API_KEY': JSON.stringify(process.env.API_KEY),
    'process.env.NODE_ENV': JSON.stringify('production'),
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  }
});