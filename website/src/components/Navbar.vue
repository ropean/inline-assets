<template>
  <nav class="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-200/50 dark:border-slate-800/50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <a href="#hero" class="flex items-center group">
          <div v-html="logoSvg" class="h-10 transition-transform group-hover:scale-105"></div>
        </a>
        
        <!-- Nav Links with sliding indicator -->
        <div class="hidden md:flex items-center gap-2 relative">
          <a v-for="(link, index) in navLinks" 
             :key="link.href" 
             :href="link.href"
             @mouseenter="hoverIndex = index"
             @mouseleave="hoverIndex = -1"
             @click="handleNavClick(index)"
             :class="[
               'relative px-4 py-2 text-sm font-medium text-center transition-colors z-10',
               currentSection === index 
                 ? 'text-primary-600 dark:text-primary-400' 
                 : 'text-slate-600 dark:text-slate-300 hover:text-primary-500 dark:hover:text-primary-400'
             ]"
             style="width: 110px;">
            {{ link.text }}
          </a>
          
          <!-- Sliding indicator -->
          <div class="absolute bottom-0 h-0.5 bg-linear-to-r from-primary-500 to-secondary-500 rounded-full pointer-events-none"
               :class="{ 'transition-all duration-300 ease-out': hoverIndex >= 0 }"
               :style="{
                 left: `${(hoverIndex >= 0 ? hoverIndex : currentSection) * 118}px`,
                 width: '110px',
                 opacity: (hoverIndex >= 0 || currentSection >= 0) ? 1 : 0
               }">
          </div>
        </div>
        
        <!-- Actions -->
        <div class="flex items-center space-x-3">
          <!-- GitHub Link -->
          <a href="https://github.com/ropean/inline-assets" target="_blank" rel="noopener noreferrer"
             class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors group"
             title="View on GitHub">
            <svg class="w-5 h-5 text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          
          <!-- npm Link -->
          <a href="https://www.npmjs.com/package/@ropean/inline-assets" target="_blank" rel="noopener noreferrer"
             class="w-10 h-10 rounded-xl bg-orange-500 hover:bg-orange-600 flex items-center justify-center transition-colors group shadow-md hover:shadow-lg"
             title="View on npm">
            <svg class="w-5 h-5 text-white transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
              <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z"/>
            </svg>
          </a>
          
          <!-- Theme Toggle -->
          <button @click="$emit('toggle-theme')"
                  class="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors"
                  :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
            <svg v-if="isDark" class="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
            <svg v-else class="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import logoSvgContent from '@assets/logo-text.svg?raw'

defineProps({
  isDark: Boolean
})

defineEmits(['toggle-theme'])

const currentSection = ref(0)
const hoverIndex = ref(-1)
const logoSvg = logoSvgContent

const navLinks = [
  { text: 'Home', href: '#hero' },
  { text: 'Features', href: '#features' },
  { text: 'Playground', href: '#playground' },
  { text: 'Quick Start', href: '#quick-start' },
]

// Handle navigation click
function handleNavClick(index) {
  currentSection.value = index
  // Don't reset hoverIndex here - let mouseleave handle it naturally
}

// Detect current section based on scroll position
function updateActiveSection() {
  const sections = ['hero', 'features', 'playground', 'quick-start']
  const scrollPosition = window.scrollY + window.innerHeight / 3
  
  for (let i = sections.length - 1; i >= 0; i--) {
    const section = document.getElementById(sections[i])
    if (section && section.offsetTop <= scrollPosition) {
      currentSection.value = i
      break
    }
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateActiveSection)
  updateActiveSection() // Initial check - sets to Home (0)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateActiveSection)
})
</script>

