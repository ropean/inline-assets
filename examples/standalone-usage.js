/**
 * Example: Using vite-plugin-inline as a standalone function
 * Works with any build tool (Webpack, Rollup, esbuild, etc.)
 */

import { inlineAssets } from 'vite-plugin-inline';

// Basic usage
async function basicExample() {
  const result = await inlineAssets({
    htmlPath: './dist/index.html'
  });

  if (result.success) {
    console.log(`✓ Successfully inlined ${result.inlinedFiles.length} files`);
  } else {
    console.error('✗ Errors occurred:', result.errors);
  }
}

// Advanced usage with all options
async function advancedExample() {
  const result = await inlineAssets({
    htmlPath: './dist/index.html',
    baseDir: './dist',
    css: true,
    js: true,
    svg: {
      img: true,   // Inline SVG in <img> tags
      link: true   // Inline SVG in <link> tags
    },
    excludes: ['vendor.js', 'assets/analytics.js'],
    removeInlinedFiles: true,
    cleanupEmptyDirs: true
  });

  console.log('Inlined files:', result.inlinedFiles);
}

// With custom logger
async function customLoggerExample() {
  const myLogger = {
    info: (msg) => console.log(`[INFO] ${msg}`),
    success: (msg) => console.log(`[✓] ${msg}`),
    warning: (msg) => console.warn(`[⚠] ${msg}`),
    error: (msg) => console.error(`[✖] ${msg}`),
  };

  await inlineAssets({
    htmlPath: './dist/index.html',
    logger: myLogger
  });
}

// Silent mode (no logging)
async function silentExample() {
  await inlineAssets({
    htmlPath: './dist/index.html',
    logger: false
  });
}

// Run examples
basicExample();

