<template>
  <div :class="{ 'dark': isDark }" class="min-h-screen">
    <Navbar :isDark="isDark" @toggle-theme="toggleDark" />
    <Hero />
    <Features />
    <Playground />
    <QuickStart />
    <Footer />
    <ScrollToTop />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import Hero from './components/Hero.vue'
import Features from './components/Features.vue'
import Playground from './components/Playground.vue'
import QuickStart from './components/QuickStart.vue'
import Footer from './components/Footer.vue'
import ScrollToTop from './components/ScrollToTop.vue'

const isDark = ref(false)

function toggleDark() {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  document.documentElement.classList.toggle('dark', isDark.value)
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  isDark.value = savedTheme === 'dark'
  document.documentElement.classList.toggle('dark', isDark.value)
})
</script>
