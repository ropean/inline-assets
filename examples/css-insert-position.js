/**
 * Example: CSS Insert Position Options
 *
 * This example demonstrates the different CSS insertion strategies
 */

import inlineAssets from '@ropean/inline-assets';
import { inlineAssets as inlineAssetsFunc } from '@ropean/inline-assets';

// ============================================================================
// As Vite Plugin
// ============================================================================

// Option 1: Keep CSS at original position (default)
// This preserves the order - if CSS <link> is before JS <script>, it stays that way
export const config1 = {
  plugins: [
    inlineAssets({
      cssInsertPosition: 'original', // Default
    }),
  ],
};

// Option 2: Move all CSS to the beginning of <head>
// Best for performance - CSS loads first
export const config2 = {
  plugins: [
    inlineAssets({
      cssInsertPosition: 'head-start',
    }),
  ],
};

// Option 3: Move all CSS to the end of <head>
// Useful if you want other head elements to load first
export const config3 = {
  plugins: [
    inlineAssets({
      cssInsertPosition: 'head-end',
    }),
  ],
};

// ============================================================================
// As Standalone Function
// ============================================================================

// Example 1: Original position (preserves order)
async function example1() {
  await inlineAssetsFunc({
    htmlPath: './dist/index.html',
    cssInsertPosition: 'original',
  });
}

// Example 2: Performance-optimized (CSS first)
async function example2() {
  await inlineAssetsFunc({
    htmlPath: './dist/index.html',
    cssInsertPosition: 'head-start',
  });
}

// Example 3: CSS at end of head
async function example3() {
  await inlineAssetsFunc({
    htmlPath: './dist/index.html',
    cssInsertPosition: 'head-end',
  });
}

// ============================================================================
// Visual Comparison
// ============================================================================

/**
 * Original HTML:
 * --------------
 * <head>
 *   <meta charset="UTF-8">
 *   <link rel="stylesheet" href="assets/style.css">
 *   <title>My App</title>
 *   <script src="assets/main.js"></script>
 * </head>
 *
 * Result with 'original':
 * -----------------------
 * <head>
 *   <meta charset="UTF-8">
 *   <style>
 *     [CSS content from style.css]
 *   </style>
 *   <title>My App</title>
 *   <script type="module">
 *     [JS content from main.js]
 *   </script>
 * </head>
 *
 * Result with 'head-start':
 * -------------------------
 * <head>
 *   <style>
 *     [CSS content from style.css]
 *   </style>
 *   <meta charset="UTF-8">
 *   <title>My App</title>
 *   <script type="module">
 *     [JS content from main.js]
 *   </script>
 * </head>
 *
 * Result with 'head-end':
 * -----------------------
 * <head>
 *   <meta charset="UTF-8">
 *   <title>My App</title>
 *   <style>
 *     [CSS content from style.css]
 *   </style>
 *   <script type="module">
 *     [JS content from main.js]
 *   </script>
 * </head>
 */

// ============================================================================
// Use Case Recommendations
// ============================================================================

/**
 * Use 'original' when:
 * - You want to preserve the exact order of your assets
 * - You have CSS that depends on specific load order
 * - You want CSS before JS (as you structured it)
 *
 * Use 'head-start' when:
 * - Performance is critical (CSS loads first = faster rendering)
 * - You want a single merged <style> tag
 * - You don't care about the original order
 *
 * Use 'head-end' when:
 * - You want other head elements (meta, title) to load first
 * - You have specific loading requirements
 * - You want a single merged <style> tag
 */
