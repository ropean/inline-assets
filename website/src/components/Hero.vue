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
        
        <!-- Code Preview -->
        <div class="mt-16 max-w-2xl mx-auto">
          <div class="card p-6 text-left animate-scale-in">
            <div class="flex items-center justify-between mb-4">
              <span class="text-sm font-mono text-slate-500 dark:text-slate-400">npm install</span>
              <button @click="copyInstall" class="text-xs px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                {{ copied ? '✓ Copied' : 'Copy' }}
              </button>
            </div>
            <code class="block font-mono text-sm sm:text-base text-slate-800 dark:text-slate-200">
              npm install @ropean/inline-assets -D
            </code>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
      </svg>
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

