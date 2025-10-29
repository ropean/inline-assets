import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/postcss';
import path from 'path';
import viteInlineAssets from '@ropean/inline-assets';

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development';

  return {
    base: './',
    esbuild: {
      pure: isDev ? [] : ['console.debug', 'console.error', 'console.log'],
    },
    server: {
      port: 5172,
      host: true,
    },
    plugins: [
      vue(),
      viteInlineAssets({
        htmlPath: './dist/index.html',
        baseDir: './dist',
        css: false,
        js: false,
        svg: { img: true, link: true },
        cssInsertPosition: 'head-start',
        removeInlinedFiles: false,
        cleanupEmptyDirs: false,
        logger: true,
      }),
    ],
    css: {
      postcss: {
        plugins: [tailwindcss],
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@assets': path.resolve(__dirname, './public/assets'),
      },
    },
    build: {
      outDir: './dist',
      minify: true,
      emptyOutDir: true,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/[name].js',
          entryFileNames: 'assets/[name].js',
          assetFileNames: 'assets/[name].[ext]',
        },
      },
      sourcemap: isDev,
      assetsInlineLimit: 1000,
    },
    optimizeDeps: {
      include: ['vue'],
    },
  };
});
