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
        <div class="card p-8">
          <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Vite Plugin
          </h3>
          <pre class="bg-slate-900 dark:bg-slate-950 text-slate-100 p-6 rounded-xl overflow-x-auto"><code class="text-sm font-mono">import inlineAssets from '@ropean/inline-assets';

export default {
  plugins: [
    inlineAssets({
      css: true,
      js: true,
      svg: { img: false, link: true }
    })
  ]
}</code></pre>
        </div>
        
        <div class="card p-8">
          <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-4">
            Standalone Function
          </h3>
          <pre class="bg-slate-900 dark:bg-slate-950 text-slate-100 p-6 rounded-xl overflow-x-auto"><code class="text-sm font-mono">import { inlineAssets } from '@ropean/inline-assets';

await inlineAssets({
  htmlPath: './dist/index.html',
  baseDir: './dist',
  css: true,
  js: true
});</code></pre>
        </div>
      </div>
    </div>
  </section>
</template>

