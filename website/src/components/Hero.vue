<template>
  <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-500 via-purple-600 to-secondary-500">
    <!-- Animated Background -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-1/2 -left-1/2 w-full h-full bg-white/10 rounded-full blur-3xl animate-float"></div>
      <div class="absolute -bottom-1/2 -right-1/2 w-full h-full bg-white/10 rounded-full blur-3xl animate-float" style="animation-delay: 1s;"></div>
    </div>
    
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      <div class="animate-slide-down">
        <div class="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-8">
          <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
          <span>Zero Dependencies • Production Ready</span>
        </div>
        
        <h1 class="text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
          Transform HTML into<br/>
          <span class="text-white/90">Self-Contained Files</span>
        </h1>
        
        <p class="text-xl sm:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
          Inline CSS, JavaScript, and SVG assets into a single HTML file. 
          Perfect for email templates, offline apps, and Chrome extensions.
        </p>
        
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#playground" 
             class="px-8 py-4 bg-white text-primary-600 rounded-2xl font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all">
            Try Live Demo →
          </a>
          <a href="#features"
             class="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-2xl font-bold text-lg border-2 border-white/30 hover:bg-white/20 transition-all">
            Learn More
          </a>
        </div>
        
        <!-- Installation Command -->
        <div class="mt-16 max-w-2xl mx-auto">
          <div class="relative group">
            <div class="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity"></div>
            <div class="relative card p-8 animate-scale-in">
              <div class="flex items-center gap-3 mb-4">
                <div class="flex gap-1.5">
                  <div class="w-3 h-3 rounded-full bg-red-400"></div>
                  <div class="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div class="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <span class="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Terminal</span>
              </div>
              <div class="flex items-center justify-between bg-slate-900 dark:bg-slate-950 rounded-xl p-5 border border-slate-700">
                <div class="flex items-center gap-3 flex-1">
                  <span class="text-green-400 font-mono text-sm">$</span>
                  <code class="font-mono text-sm sm:text-base text-slate-100 flex-1">npm install @ropean/inline-assets -D</code>
                </div>
                <button @click="copyInstall" 
                        class="ml-4 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all text-sm font-medium border border-slate-600 hover:border-slate-500">
                  {{ copied ? '✓ Copied' : 'Copy' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const copied = ref(false)

function copyInstall() {
  navigator.clipboard.writeText('npm install @ropean/inline-assets -D')
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

