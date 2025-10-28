import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig(({ command }) => ({
  // Use /inline-assets/ for production (GitHub Pages), / for development
  base: command === 'build' ? '/inline-assets/' : '/',
  plugins: [vue()],
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@package': path.resolve(__dirname, '../package.json'),
      '@src': path.resolve(__dirname, '../src'),
      '@examples': path.resolve(__dirname, '../examples'),
    },
  },
  
  build: {
    outDir: '../dist-website',
    emptyOutDir: true,
    
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    
    // Enable CSS code splitting
    cssCodeSplit: true,
    
    // Minification options
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
      format: {
        comments: false,
      },
    },
    
    // Rollup options for better code splitting
    rollupOptions: {
      output: {
        // Manual chunks for better caching
        manualChunks: {
          'vue-vendor': ['vue'],
          'monaco': ['@monaco-editor/loader'],
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // Organize assets by type
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/\.(png|jpe?g|svg|gif|tiff|bmp|ico)$/i.test(assetInfo.name)) {
            return `assets/images/[name]-[hash][extname]`;
          }
          if (/\.(woff2?|eot|ttf|otf)$/i.test(assetInfo.name)) {
            return `assets/fonts/[name]-[hash][extname]`;
          }
          if (ext === 'css') {
            return `assets/css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
    
    // Source maps for production debugging (optional)
    sourcemap: false,
    
    // Optimize asset inlining threshold (4kb)
    assetsInlineLimit: 4096,
  },
  
  // Optimize dependencies
  optimizeDeps: {
    include: ['vue', 'copy-to-clipboard'],
    exclude: ['@monaco-editor/loader'],
  },
  
  // Performance optimizations
  server: {
    hmr: {
      overlay: true,
    },
  },
}));

