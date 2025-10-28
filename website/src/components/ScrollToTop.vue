<template>
  <transition name="fade">
    <button v-if="showScrollTop" @click="launch"
            ref="rocketButton"
            :style="rocketStyle"
            :class="[
              'fixed text-5xl z-50 cursor-pointer filter drop-shadow-lg',
              isLaunching ? 'launching' : 'idle'
            ]"
            aria-label="Scroll to top">
      <span class="rocket-wrapper" ref="rocketWrapper">
        <span class="rocket-icon" ref="rocketIcon">🚀</span>
        <span class="flame" ref="flameIcon" :style="flameStyle">🔥</span>
      </span>
    </button>
  </transition>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const showScrollTop = ref(false)
const isLaunching = ref(false)
const launchProgress = ref(0)
const rocketButton = ref(null)
const rocketWrapper = ref(null)
const rocketIcon = ref(null)
const flameIcon = ref(null)

const rocketStyle = computed(() => {
  if (!isLaunching.value) {
    return {
      bottom: '3rem',
      right: '0rem'
    }
  }
  
  // Dynamically calculate position during launch, rocket flies from bottom to top
  const viewportHeight = window.innerHeight
  const startBottom = 32 // 2rem = 32px
  const endTop = -100 // Fly out of viewport top
  const totalDistance = viewportHeight + startBottom + Math.abs(endTop)
  
  // Calculate current position based on progress
  const currentDistance = totalDistance * launchProgress.value
  const currentBottom = startBottom + currentDistance
  
  return {
    bottom: `${currentBottom}px`,
    right: '0rem'
  }
})

const flameStyle = computed(() => {
  if (!rocketIcon.value) {
    return { opacity: 0 }
  }
  
  // Measure rocket icon dimensions for accurate flame placement
  const rect = rocketIcon.value.getBoundingClientRect()
  const rocketHeight = rect.height
  
  // Position flame at rocket exhaust: centered horizontally, offset vertically below tail
  const flameBottom = -rocketHeight * 0.4
  
  const baseFontSize = 0.65
  
  if (isLaunching.value) {
    // Amplify flame intensity during launch sequence (grows up to 1.6x base size)
    const sizeMultiplier = 1 + launchProgress.value * 0.6
    return {
      bottom: `${flameBottom}px`,
      left: '50%',
      transform: 'translateX(-50%) rotate(180deg)',
      fontSize: `${baseFontSize * sizeMultiplier}em`,
      opacity: 1
    }
  }
  
  return {
    bottom: `${flameBottom}px`,
    left: '50%',
    transform: 'translateX(-50%) rotate(180deg)',
    fontSize: `${baseFontSize}em`,
    opacity: 0
  }
})

function launch() {
  isLaunching.value = true
  launchProgress.value = 0
  
  const duration = 1500 // Total launch animation duration in milliseconds
  const startTime = Date.now()
  
  function animate() {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)
    
    // Custom easing: slow ignition, then rapid acceleration
    if (progress < 0.3) {
      // First 30%: gradual ignition phase (covers 10% of distance)
      launchProgress.value = progress * 0.1 / 0.3
    } else {
      // Remaining 70%: explosive acceleration phase (covers 90% of distance)
      launchProgress.value = 0.1 + (progress - 0.3) * 0.9 / 0.7
    }
    
    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      // Reset state after animation completes
      setTimeout(() => {
        isLaunching.value = false
        launchProgress.value = 0
        showScrollTop.value = false  
      }, 100)
    }
  }
  
  animate()
  
  // Trigger page scroll after initial launch animation
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, 500)
}

function handleScroll() {
  // Show rocket button after scrolling past first viewport
  if (!isLaunching.value) {
    showScrollTop.value = window.scrollY > window.innerHeight
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px) scale(0.95);
}

.rocket-wrapper {
  position: relative;
  display: inline-block;
}

.rocket-icon {
  display: inline-block;
  transform: rotate(-45deg);
}

.flame {
  position: absolute;
  opacity: 0;
  transition: all 0.1s ease-out;
  pointer-events: none;
  line-height: 1;
}

/* Idle state */
.idle {
  transition: all 0.3s ease;
}

.idle:hover .flame {
  opacity: 0.5;
  animation: flicker 0.3s infinite;
}

/* Launch animation */
.launching {
  transition: opacity 0.3s ease;
}

.launching .flame {
  opacity: 1;
}


@keyframes flicker {
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.7;
  }
}
</style>

