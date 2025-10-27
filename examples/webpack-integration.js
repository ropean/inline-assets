/**
 * Example: Integrating @ropean/inline-assets with Webpack
 */

const { inlineAssets } = require('@ropean/inline-assets');

module.exports = {
  // ... your webpack config

  plugins: [
    // Add as a custom plugin
    {
      apply: (compiler) => {
        compiler.hooks.done.tap('InlineAssetsPlugin', async (stats) => {
          if (stats.hasErrors()) {
            console.log('Build failed, skipping asset inlining');
            return;
          }

          console.log('Build complete, inlining assets...');

          const result = await inlineAssets({
            htmlPath: './dist/index.html',
            baseDir: './dist',
          });

          if (result.success) {
            console.log(`✓ Inlined ${result.inlinedFiles.length} files`);
          }
        });
      },
    },
  ],
};
