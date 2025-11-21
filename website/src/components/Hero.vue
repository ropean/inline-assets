<template>
  <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-primary-500 via-purple-600 to-secondary-500">
    <!-- Animated Background -->
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute -top-1/2 -left-1/2 w-full h-full bg-white/10 rounded-full blur-3xl animate-float"></div>
      <div class="absolute -bottom-1/2 -right-1/2 w-full h-full bg-white/10 rounded-full blur-3xl animate-float" style="animation-delay: 1s;"></div>
    </div>
    
    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      <div class="animate-slide-down">
        <div class="inline-flex items-center space-x-4 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-8">
          <div class="flex items-center space-x-2">
            <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
            <span>Zero Dependencies</span>
          </div>
          <div class="flex items-center space-x-2">
            <svg class="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span>Production Ready</span>
          </div>
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
            <div class="absolute -inset-1 bg-linear-to-r from-primary-500 to-secondary-500 rounded-2xl blur-lg opacity-25 group-hover:opacity-40 transition-opacity"></div>
            <div class="relative animate-scale-in">
              <TerminalBlock title="Terminal">
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
              </TerminalBlock>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import TerminalBlock from './TerminalBlock.vue'

const copied = ref(false)

function copyInstall() {
  navigator.clipboard.writeText('npm install @ropean/inline-assets -D')
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

