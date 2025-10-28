<template>
  <div id="app" :class="{ 'dark-mode': isDarkMode }">
    <Navbar :isDarkMode="isDarkMode" @toggle-theme="toggleTheme" />
    
    <!-- Scroll to top button -->
    <transition name="fade">
      <button 
        v-if="showScrollTop" 
        class="scroll-to-top"
        @click="scrollToTop"
        aria-label="Scroll to top"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
      </button>
    </transition>

    <!-- Theme toggle button -->
    <button 
      class="theme-toggle"
      @click="toggleTheme"
      :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
    >
      <transition name="rotate" mode="out-in">
        <svg v-if="!isDarkMode" key="moon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
        <svg v-else key="sun" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
        </svg>
      </transition>
    </button>
    
    <main class="fullscreen-container">
      <!-- Screen 1: Hero -->
      <section class="screen screen-1" id="hero">
        <Hero :isDarkMode="isDarkMode" />
      </section>
      
      <!-- Screen 2: Features -->
      <section class="screen screen-2" id="features">
        <Features :isDarkMode="isDarkMode" />
      </section>
      
      <!-- Screen 3: Playground -->
      <section class="screen screen-3" id="playground">
        <Playground :isDarkMode="isDarkMode" />
      </section>
      
      <!-- Screen 4: Quick Start + Footer -->
      <section class="screen screen-4" id="quick-start">
        <QuickStart :isDarkMode="isDarkMode" />
        <Footer :isDarkMode="isDarkMode" />
      </section>
    </main>
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref, onMounted, onUnmounted } from 'vue';
import Navbar from './components/Navbar.vue';
import Hero from './components/Hero.vue';
import Features from './components/Features.vue';
// Lazy load Playground component for better initial load performance
const Playground = defineAsyncComponent(() => import('./components/Playground.vue'));
import QuickStart from './components/QuickStart.vue';
import Footer from './components/Footer.vue';

// Dark mode state
const isDarkMode = ref(false);
const showScrollTop = ref(false);

// Load theme preference from localStorage
onMounted(() => {
  const savedTheme = localStorage.getItem('theme');
  isDarkMode.value = savedTheme === 'dark';
  
  // Add scroll listener
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

function toggleTheme() {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
}

function handleScroll() {
  // Show scroll-to-top button when scrolled past first screen
  showScrollTop.value = window.scrollY > window.innerHeight;
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
</script>

<style>
/* Fullscreen layout - smooth and fluid */
.fullscreen-container {
  margin-top: 0;
}

.screen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: background-color 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Smooth scrolling without snap */
html {
  scroll-behavior: smooth;
}

/* Screen color schemes - modern and clean */
.screen-1 {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.screen-2 {
  background: #ffffff;
}

.dark-mode .screen-2 {
  background: #0f172a;
  color: #e2e8f0;
}

.screen-3 {
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
}

.dark-mode .screen-3 {
  background: linear-gradient(180deg, #1e293b 0%, #0f172a 100%);
  color: #e2e8f0;
}

.screen-4 {
  background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
}

.dark-mode .screen-4 {
  background: linear-gradient(180deg, #0f172a 0%, #020617 100%);
  color: #e2e8f0;
}

/* Scroll to top button - modern design */
.scroll-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 999;
  backdrop-filter: blur(10px);
}

.scroll-to-top:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.4);
}

.scroll-to-top:active {
  transform: translateY(0) scale(0.98);
}

/* Theme toggle button - modern design */
.theme-toggle {
  position: fixed;
  top: 5rem;
  right: 2rem;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(0, 0, 0, 0.08);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 999;
  color: #667eea;
  backdrop-filter: blur(10px);
}

.dark-mode .theme-toggle {
  background: rgba(30, 41, 59, 0.95);
  border-color: rgba(255, 255, 255, 0.1);
  color: #fbbf24;
}

.theme-toggle:hover {
  transform: scale(1.08);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}

.theme-toggle:active {
  transform: scale(0.95);
}

/* Transitions - smooth and modern */
.fade-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 1, 1);
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.95);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}

.rotate-enter-active, .rotate-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.rotate-enter-from {
  opacity: 0;
  transform: rotate(-180deg) scale(0.8);
}

.rotate-leave-to {
  opacity: 0;
  transform: rotate(180deg) scale(0.8);
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .scroll-to-top {
    width: 48px;
    height: 48px;
    bottom: 1.5rem;
    right: 1.5rem;
    border-radius: 14px;
  }
  
  .theme-toggle {
    width: 44px;
    height: 44px;
    top: 4.5rem;
    right: 1.5rem;
    border-radius: 12px;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  html {
    scroll-behavior: auto !important;
  }
}
</style>

