import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
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
    
    // Rollup options for multi-page or specific entry points
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html')
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

