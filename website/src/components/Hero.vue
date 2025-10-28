<template>
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <h1 class="hero-title">
          <span class="gradient-text">@ropean/inline-assets</span>
          <br>
          Zero-Dependency Asset Inlining Tool
        </h1>
        <p class="hero-subtitle">
          Inline CSS, JavaScript, and SVG into HTML for single-file deployment.
          <br>
          Works as a Vite plugin or standalone function with any build tool.
        </p>
        <div class="hero-buttons">
          <a href="#playground" class="btn btn-primary">🚀 Live Playground</a>
          <a href="https://github.com/ropean/inline-assets" target="_blank" class="btn btn-outline">
            📚 View Docs
          </a>
        </div>
        <div class="hero-install">
          <div class="install-label">Install</div>
          <code class="install-code">
            npm install @ropean/inline-assets -D
          </code>
          <button class="copy-btn" @click="copyInstallCode">{{ copied ? '✓' : '📋' }}</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import copy from 'copy-to-clipboard';
import { ref } from 'vue';
const copied = ref(false);
const copyInstallCode = () => {
  const text = 'npm install @ropean/inline-assets -D';
  copy(text);
  copied.value = true;
  setTimeout(() => { copied.value = false; }, 3000);
};
</script>

<style scoped>
.hero {
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8rem 2rem 4rem;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.container {
  max-width: 900px;
  text-align: center;
  position: relative;
  z-index: 1;
}

.hero-content {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-title {
  font-size: 4rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.gradient-text {
  background: linear-gradient(45deg, #fff, #a8edea);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.5rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  opacity: 0.95;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
}

.btn {
  padding: 1rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  display: inline-block;
}

.btn-primary {
  background: white;
  color: #667eea;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.btn-outline {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-outline:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.hero-install {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  padding: 1rem 1.5rem;
  max-width: 600px;
  margin: 0 auto;
}

.install-label {
  font-size: 0.9rem;
  opacity: 0.8;
  font-weight: 500;
}

.install-code {
  flex: 1;
  font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
  font-size: 1rem;
  background: transparent;
  color: white;
  border: none;
}

.copy-btn {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.5rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.copy-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .hero {
    padding: 6rem 1rem 3rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-buttons {
    flex-direction: column;
  }

  .hero-install {
    flex-direction: column;
    text-align: center;
  }

  .install-code {
    font-size: 0.85rem;
  }
}
</style>

