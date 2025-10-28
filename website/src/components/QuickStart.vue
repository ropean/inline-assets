<template>
  <section id="quick-start" class="quick-start">
    <div class="container">
      <h2 class="section-title">Quick Start</h2>

      <!-- Install command intentionally removed as requested -->

      <div class="grid two">
        <div class="card">
          <h3>Vite Plugin</h3>
          <pre><code>import inlineAssets from '@ropean/inline-assets';

export default defineConfig({
  plugins: [
    inlineAssets({
      css: true,
      js: true,
      svg: { img: false, link: true },
      excludes: ['vendor.js'],
      cssInsertPosition: 'original',
      logger: false
    })
  ]
});</code></pre>
        </div>

        <div class="card">
          <h3>Standalone</h3>
          <pre><code>import { inlineAssets } from '@ropean/inline-assets';

await inlineAssets({
  htmlPath: './dist/index.html',
  baseDir: './dist',
  css: true,
  js: true,
  svg: { img: false, link: true },
  excludes: ['vendor.js'],
  removeInlinedFiles: true,
  cleanupEmptyDirs: true,
  cssInsertPosition: 'original',
  logger: false
});</code></pre>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.quick-start { padding: 6rem 2rem; background: #f9fafb; }
.container { max-width: 1100px; margin: 0 auto; }
.section-title { font-size: 2rem; font-weight: 800; text-align:center; margin-bottom: .5rem; }
.section-subtitle { text-align:center; color: #6b7280; margin-bottom: 2rem; }
/* install row removed */
.grid.two { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.card { background: #fff; border: 1px solid #e5e7eb; border-radius: 14px; padding: 1rem; }
pre { background: #0b1020; color: #a8edea; padding: 1rem; border-radius: 10px; overflow-x: auto; }
h3 { margin: 0 0 .75rem; font-size: 1.1rem; }
@media (max-width: 900px) { .grid.two { grid-template-columns: 1fr; } }
@media (max-width: 768px) { .quick-start { padding: 4rem 1rem; } }
</style>


