/**
 * Example: Integrating vite-plugin-inline with Gulp
 */

import { inlineAssets } from 'vite-plugin-inline';
import gulp from 'gulp';

// Basic inline task
gulp.task('inline', async () => {
  console.log('Inlining assets...');

  const result = await inlineAssets({
    htmlPath: './dist/index.html',
    baseDir: './dist',
    css: true,
    js: true,
    svg: { img: false, link: true },
  });

  if (result.success) {
    console.log(`✓ Successfully inlined ${result.inlinedFiles.length} files`);
  } else {
    console.error('✗ Failed to inline assets');
    throw new Error('Inline assets failed');
  }
});

// Build task that includes inlining
gulp.task('build', gulp.series('your-build-task', 'inline'));

// Watch mode with inlining
gulp.task('watch', () => {
  gulp.watch('src/**/*', gulp.series('build'));
});

// Advanced example with custom options
gulp.task('inline:advanced', async () => {
  const result = await inlineAssets({
    htmlPath: './dist/index.html',
    baseDir: './dist',
    css: true,
    js: true,
    svg: {
      img: true, // Inline SVG in img tags
      link: true, // Inline SVG in link tags
    },
    excludes: [
      'vendor.js', // Exclude vendor files
      'assets/analytics.js', // Exclude analytics
    ],
    cssInsertPosition: 'original', // Keep CSS at original position
    removeInlinedFiles: true,
    cleanupEmptyDirs: true,
  });

  if (!result.success) {
    console.error('Errors:', result.errors);
    throw new Error('Inline assets failed');
  }

  console.log('Inlined files:');
  result.inlinedFiles.forEach((file) => {
    console.log(`  - ${file}`);
  });
});

// Production build with inlining
gulp.task('build:prod', gulp.series('clean', 'compile', 'minify', 'inline'));

// Default task
gulp.task('default', gulp.series('build'));
