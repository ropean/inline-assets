/**
 * Example: Using vite-plugin-inline as a Vite plugin
 */

import { defineConfig } from 'vite';
import viteInlineAssets from 'vite-plugin-inline';

export default defineConfig({
  plugins: [
    // Basic usage with default options
    viteInlineAssets(),

    // Or with custom options
    viteInlineAssets({
      css: true,
      js: true,
      svg: {
        img: false,  // Don't inline SVG in <img> tags
        link: true   // Inline SVG in <link> tags (favicon)
      },
      excludes: [
        'vendor.js',           // Exclude specific filename
        'assets/large-lib.js'  // Exclude specific path
      ],
      logger: false  // Disable logging
    })
  ]
});

