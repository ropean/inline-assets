<template>
  <section id="quick-start" class="py-24 bg-white dark:bg-slate-950">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4">
          Get Started in Seconds
        </h2>
        <p class="text-xl text-slate-600 dark:text-slate-400">
          Choose your integration method
        </p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="card p-8 border-t-4 border-primary-500 relative overflow-hidden group">
          <div class="absolute top-0 right-0 w-32 h-32 bg-primary-500 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <div class="relative">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-lg bg-linear-to-br from-primary-400 to-primary-600 flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-slate-900 dark:text-white">
                Vite Plugin
              </h3>
            </div>
            <pre class="bg-slate-900 dark:bg-slate-950 text-slate-100 p-6 rounded-xl overflow-x-auto border border-slate-700 h-120"><code class="text-sm font-mono leading-relaxed">import viteInlineAssets from '@ropean/inline-assets';

export default {
  plugins: [
    viteInlineAssets({
      htmlPath: './dist/index.html',
      baseDir: './dist',
      css: true,
      js: true,
      svg: { img: false, link: true },
      cssInsertPosition: 'original',
      removeInlinedFiles: true,
      cleanupEmptyDirs: true,
      logger: true
    })
  ]
}</code></pre>
          </div>
        </div>
        
        <div class="card p-8 border-t-4 border-secondary-500 relative overflow-hidden group">
          <div class="absolute top-0 right-0 w-32 h-32 bg-secondary-500 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
          <div class="relative">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-lg bg-linear-to-br from-secondary-400 to-secondary-600 flex items-center justify-center">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                </svg>
              </div>
              <h3 class="text-2xl font-bold text-slate-900 dark:text-white">
                Standalone Function
              </h3>
            </div>
            <pre class="bg-slate-900 dark:bg-slate-950 text-slate-100 p-6 rounded-xl overflow-x-auto border border-slate-700 h-120"><code class="text-sm font-mono leading-relaxed">import { inlineAssets } from '@ropean/inline-assets';

await inlineAssets({
  htmlPath: './dist/index.html',
  baseDir: './dist',
  css: true,
  js: true,
  svg: { img: false, link: true },
  excludes: [
    'vendor.js',
  ],
  cssInsertPosition: 'original',
  removeInlinedFiles: true,
  cleanupEmptyDirs: true,
  logger: true
});</code></pre>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

