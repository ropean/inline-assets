/**
 * Example: Using @ropean/inline-assets as a Vite plugin
 */

import { defineConfig } from 'vite';
import inlineAssets from '@ropean/inline-assets';

export default defineConfig({
  plugins: [
    // Basic usage with default options
    inlineAssets(),

    // Or with custom options
    inlineAssets({
      css: true,
      js: true,
      svg: {
        img: false, // Don't inline SVG in <img> tags
        link: true, // Inline SVG in <link> tags (favicon)
      },
      excludes: [
        'vendor.js', // Exclude specific filename
        'assets/large-lib.js', // Exclude specific path
      ],
      logger: false, // Disable logging
    }),
  ],
});
