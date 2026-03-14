import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  // Use React, Tailwind, and Image Optimizer plugins
  plugins: [
    react(),
    tailwindcss(),
    ViteImageOptimizer({
      png: { quality: 80 },
      jpeg: { quality: 80 },
      jpg: { quality: 80 },
      webp: { lossless: true },
      avif: { lossless: true },
      svg: {
        multipass: true,
      },
    }),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'assets/logo/logo.svg', 'assets/logo/logo.png'],
      manifest: {
        name: 'AMF GROUP - Wykończenie wnętrz we Wrocławiu',
        short_name: 'AMF GROUP',
        description: 'Profesjonalne wykończenie wnętrz we Wrocławiu. Remonty pod klucz.',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'assets/logo/logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'assets/logo/logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  
  // Source files are in src/ directory
  root: 'src',
  
  // Public directory for static assets (copied as-is)
  publicDir: '../public',
  
  // Options to strip console logs in production
  esbuild: {
    drop: ['console', 'debugger'],
  },

  build: {
    // Output to dist/ directory (relative to project root)
    outDir: '../dist',
    emptyOutDir: true,
    
    // Organize built assets
    assetsDir: 'assets',
    
    // Generate source maps for debugging
    sourcemap: false,
    
    // Enable CSS code splitting for better performance
    cssCodeSplit: true,

    // Rollup options for chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['glightbox']
        }
      }
    }
  },
  
  // CSS configuration
  css: {
    // CSS Modules configuration
    modules: {
      // Convert kebab-case to camelCase for JS imports
      localsConvention: 'camelCase',
      // Generate scoped class names
      generateScopedName: '[name]__[local]___[hash:base64:5]'
    }
  },
  
  // Resolve configuration for imports
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@components': resolve(__dirname, 'src/components'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@css': resolve(__dirname, 'src/css')
    }
  },
  
  // Development server configuration
  server: {
    host: true,
    port: 3000,
    open: true
  },
  
  // Preview server configuration (for testing production builds)
  preview: {
    host: true,
    port: 8080
  }
});
