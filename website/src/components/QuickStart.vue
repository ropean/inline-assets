<template>
  <section id="quick-start" class="relative min-h-screen bg-linear-to-br from-emerald-900 via-teal-900 to-cyan-900 overflow-hidden">
    <!-- Animated Waves -->
    <div class="absolute inset-0 opacity-20">
      <svg class="absolute bottom-0 w-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path fill="rgba(16, 185, 129, 0.3)" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
          <animate attributeName="d" dur="10s" repeatCount="indefinite" values="
            M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
            M0,160L48,144C96,128,192,96,288,96C384,96,480,128,576,144C672,160,768,160,864,144C960,128,1056,96,1152,96C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z;
            M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"/>
        </path>
      </svg>
    </div>
    
    <!-- Sparkles -->
    <div class="absolute top-1/4 right-1/4 w-1 h-1 bg-emerald-400 rounded-full animate-pulse"></div>
    <div class="absolute top-3/4 left-1/4 w-1 h-1 bg-teal-400 rounded-full animate-pulse" style="animation-delay: 0.7s;"></div>
    <div class="absolute bottom-1/4 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style="animation-delay: 1.4s;"></div>
    
    <!-- Content Wrapper with Flexbox Layout -->
    <div class="relative min-h-screen flex flex-col">
      <!-- Main Content - Centered -->
      <div class="flex-1 flex items-center py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div class="text-center mb-8">
            <h2 class="text-4xl sm:text-5xl font-black text-white mb-4">
              Get Started in Seconds
            </h2>
            <p class="text-xl text-emerald-200">
              Choose your integration method
            </p>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="card p-8 border-t-4 border-primary-500 relative overflow-hidden group">
              <div class="absolute top-0 right-0 w-32 h-32 bg-primary-500 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div class="relative">
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-3">
                    <svg class="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                    <h3 class="text-2xl font-bold text-slate-900 dark:text-white">
                      Vite Plugin
                    </h3>
                  </div>
                  <button @click="copyViteConfig"
                          class="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-600 hover:text-slate-700 transition-all text-sm font-medium">
                    {{ copiedVite ? '✓ Copied' : 'Copy' }}
                  </button>
                </div>
                <pre class="bg-slate-900 dark:bg-slate-950 text-slate-100 p-4 rounded-xl overflow-x-auto border border-slate-700 max-h-80overflow-y-auto"><code class="text-xs font-mono leading-relaxed">import viteInlineAssets from '@ropean/inline-assets';

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
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center gap-3">
                    <svg class="w-8 h-8 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                    </svg>
                    <h3 class="text-2xl font-bold text-slate-900 dark:text-white">
                      Standalone Function
                    </h3>
                  </div>
                  <button @click="copyStandaloneConfig"
                          class="px-4 py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-600 hover:text-slate-700 transition-all text-sm font-medium">
                    {{ copiedStandalone ? '✓ Copied' : 'Copy' }}
                  </button>
                </div>
                <pre class="bg-slate-900 dark:bg-slate-950 text-slate-100 p-4 rounded-xl overflow-x-auto border border-slate-700 max-h-80overflow-y-auto"><code class="text-xs font-mono leading-relaxed">import { inlineAssets } from '@ropean/inline-assets';

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
      </div>
      
      <!-- Footer - Always at Bottom -->
      <footer class="relative bg-slate-950/50 backdrop-blur-sm border-t border-emerald-800/30 py-8 mt-auto">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex flex-col md:flex-row items-center justify-between">
            <div class="mb-4 md:mb-0">
              <p class="text-emerald-300/60 text-sm">
                MIT © 2025 <a href="https://aceapp.dev" class="text-emerald-300/80 hover:text-emerald-200 transition-colors  decoration-emerald-800 decoration-dotted ">AceApp</a>
              </p>
            </div>
            <div class="flex items-center space-x-6">

            </div>
          </div>
        </div>
      </footer>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const copiedVite = ref(false)
const copiedStandalone = ref(false)

const viteConfig = `import viteInlineAssets from '@ropean/inline-assets';

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
}`

const standaloneConfig = `import { inlineAssets } from '@ropean/inline-assets';

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
});`

function copyViteConfig() {
  navigator.clipboard.writeText(viteConfig)
  copiedVite.value = true
  setTimeout(() => { copiedVite.value = false }, 2000)
}

function copyStandaloneConfig() {
  navigator.clipboard.writeText(standaloneConfig)
  copiedStandalone.value = true
  setTimeout(() => { copiedStandalone.value = false }, 2000)
}
</script>

