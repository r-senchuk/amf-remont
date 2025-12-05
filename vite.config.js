import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Use React and Tailwind plugins
  plugins: [
    react(),
    tailwindcss(),
  ],
  
  // Source files are in src/ directory
  root: 'src',
  
  // Public directory for static assets (copied as-is)
  publicDir: '../public',
  
  build: {
    // Output to dist/ directory (relative to project root)
    outDir: '../dist',
    emptyOutDir: true,
    
    // Organize built assets
    assetsDir: 'assets',
    
    // Generate source maps for debugging
    sourcemap: false,
    
    // Enable CSS code splitting for better performance
    cssCodeSplit: true
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
    port: 3000,
    open: true
  },
  
  // Preview server configuration (for testing production builds)
  preview: {
    port: 8080
  }
});
