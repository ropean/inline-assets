<template>
  <nav class="navbar" :class="{ 'dark': isDarkMode }">
    <div class="container">
      <div class="nav-brand">
        <a href="#hero" class="logo">
          <img src="/logo-text.svg" alt="@ropean/inline-assets" class="logo-svg" />
        </a>
      </div>
      
      <ul class="nav-links" ref="navLinks">
        <li 
          v-for="(link, index) in links" 
          :key="link.href"
          @mouseenter="handleHover(index)"
        >
          <a 
            :href="link.href" 
            :target="link.external ? '_blank' : undefined"
            :rel="link.external ? 'noopener noreferrer' : undefined"
          >
            {{ link.text }}
          </a>
        </li>
        <!-- Sliding indicator -->
        <span 
          class="nav-indicator" 
          :style="indicatorStyle"
        ></span>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';

defineProps({
  isDarkMode: Boolean
});

const links = [
  { text: 'Features', href: '#features', external: false },
  { text: 'Playground', href: '#playground', external: false },
  { text: 'Quick Start', href: '#quick-start', external: false },
  { text: 'GitHub', href: 'https://github.com/ropean/inline-assets', external: true }
];

const navLinks = ref(null);
const indicatorStyle = reactive({
  left: '0px',
  width: '0px',
  opacity: '0'
});

function handleHover(index) {
  if (!navLinks.value) return;
  
  const linkElements = navLinks.value.querySelectorAll('li');
  const targetLink = linkElements[index];
  
  if (targetLink) {
    const { offsetLeft, offsetWidth } = targetLink;
    indicatorStyle.left = `${offsetLeft}px`;
    indicatorStyle.width = `${offsetWidth}px`;
    indicatorStyle.opacity = '1';
  }
}

onMounted(() => {
  // Reset indicator on mouse leave
  if (navLinks.value) {
    navLinks.value.addEventListener('mouseleave', () => {
      indicatorStyle.opacity = '0';
    });
  }
});
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 1rem 0;
  transition: all 0.3s ease;
}

.navbar.dark {
  background: rgba(26, 26, 46, 0.95);
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  display: flex;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: all 0.3s ease;
}

.logo:hover {
  transform: scale(1.02);
  filter: brightness(1.1);
}

.logo-svg {
  height: 40px;
  width: auto;
  display: block;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
  margin: 0;
  padding: 0;
  position: relative;
}

.nav-links li {
  position: relative;
  z-index: 1;
}

.nav-links a {
  text-decoration: none;
  color: #2c3e50;
  font-weight: 500;
  transition: color 0.3s ease;
  padding: 0.5rem 0;
  display: block;
}

.navbar.dark .nav-links a {
  color: #e0e0e0;
}

.nav-links a:hover {
  color: #667eea;
}

/* Sliding indicator */
.nav-indicator {
  position: absolute;
  bottom: -0.5rem;
  height: 3px;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 2px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.4);
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }
  
  .logo-svg {
    height: 32px;
  }
  
  .nav-links {
    gap: 1rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .logo-svg {
    height: 28px;
  }
  
  .nav-links {
    gap: 0.5rem;
    font-size: 0.85rem;
  }
  
  .nav-indicator {
    display: none; /* Hide indicator on very small screens */
  }
}
</style>

