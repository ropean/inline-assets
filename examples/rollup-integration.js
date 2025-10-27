/**
 * Example: Integrating vite-plugin-inline with Rollup
 */

import { inlineAssets } from 'vite-plugin-inline';

export default {
  // ... your rollup config
  
  plugins: [
    // Add as a custom plugin
    {
      name: 'inline-assets',
      async closeBundle() {
        console.log('Build complete, inlining assets...');
        
        const result = await inlineAssets({
          htmlPath: './dist/index.html',
          baseDir: './dist',
          css: true,
          js: true,
          svg: true
        });

        if (result.success) {
          console.log(`✓ Inlined ${result.inlinedFiles.length} files`);
        } else {
          console.error('✗ Errors:', result.errors);
        }
      }
    }
  ]
};

