/**
 * Example: Using vite-plugin-inline with npm scripts
 *
 * Add to package.json:
 * {
 *   "scripts": {
 *     "build": "vite build",
 *     "postbuild": "node inline-assets.js"
 *   }
 * }
 */

import { inlineAssets } from 'vite-plugin-inline';

async function main() {
  console.log('Starting asset inlining...');

  const result = await inlineAssets({
    htmlPath: './dist/index.html',
    css: true,
    js: true,
    svg: { img: false, link: true },
  });

  if (result.success) {
    console.log(`\n✓ Success! Inlined ${result.inlinedFiles.length} files:`);
    result.inlinedFiles.forEach((file) => {
      console.log(`  - ${file}`);
    });
  } else {
    console.error('\n✗ Failed to inline assets:');
    result.errors.forEach((error) => {
      console.error(`  - ${error}`);
    });
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
