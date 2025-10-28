<template>
  <section id="playground" class="relative min-h-screen bg-linear-to-br from-cyan-900 via-blue-900 to-indigo-900 overflow-hidden">
    <!-- Animated Tech Lines -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0" style="background-image: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(59, 130, 246, 0.5) 2px, rgba(59, 130, 246, 0.5) 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(59, 130, 246, 0.5) 2px, rgba(59, 130, 246, 0.5) 4px); background-size: 100px 100px;"></div>
    </div>
    
    <!-- Floating Particles -->
    <div class="absolute top-1/3 left-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div>
    <div class="absolute top-2/3 right-1/3 w-2 h-2 bg-blue-400 rounded-full animate-ping" style="animation-delay: 0.5s;"></div>
    <div class="absolute bottom-1/3 left-2/3 w-2 h-2 bg-indigo-400 rounded-full animate-ping" style="animation-delay: 1s;"></div>
    
    <!-- Content Container - Centered Wrapper -->
    <div class="relative min-h-screen flex items-center py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div class="text-center mb-8">
        <h2 class="text-4xl sm:text-5xl font-black text-white mb-4">
          Try It Live
        </h2>
        <p class="text-xl text-cyan-200 mb-6">
          See the magic happen in real-time
        </p>
        
        <!-- Preset Selector and Action Buttons -->
        <div class="flex items-center justify-center gap-4 flex-wrap">
          <!-- Preset Buttons Group -->
          <div class="flex items-center gap-2 px-3 py-2 bg-white/10 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-cyan-400/20">
            <span class="text-xs font-semibold text-cyan-300 uppercase tracking-wider px-2">Presets:</span>
            <button v-for="preset in presets" :key="preset.name"
                    @click="loadPreset(preset)"
                    :class="[
                      'px-4 py-1.5 rounded-lg text-sm font-medium transition-all',
                      selectedPreset === preset.name
                        ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                        : 'bg-transparent text-cyan-100 hover:bg-cyan-500/20 hover:text-white'
                    ]">
              {{ preset.name }}
            </button>
          </div>
          
          <!-- Action Buttons Group -->
          <div class="flex items-center gap-2 px-3 py-2 bg-white/10 dark:bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-400/20">
            <span class="text-xs font-semibold text-purple-300 uppercase tracking-wider px-2">Actions:</span>
            <button @click="resetPlayground"
                    class="px-5 py-2 rounded-lg font-medium text-sm bg-slate-400 hover:bg-slate-500 text-slate-900 hover:text-white transition-all shadow-sm hover:shadow-md hover:scale-105">
              Reset
            </button>
            <button @click="processInline"
                    :disabled="isProcessing"
                    class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
              {{ isProcessing ? 'Processing...' : 'Inline Assets' }}
            </button>
          </div>
        </div>
      </div>
      
      <div class="space-y-4">
        <!-- Input Section -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- HTML Input -->
          <TerminalBlock title="HTML">
            <textarea v-model="inputHtml"
                      class="w-full h-40 p-4 bg-slate-900 dark:bg-slate-950 border border-slate-700 rounded-lg font-mono text-xs text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      placeholder="Enter your HTML..."></textarea>
          </TerminalBlock>
          
          <!-- CSS Input -->
          <TerminalBlock title="CSS">
            <textarea v-model="inputCss"
                      class="w-full h-40 p-4 bg-slate-900 dark:bg-slate-950 border border-slate-700 rounded-lg font-mono text-xs text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      placeholder="Enter your CSS..."></textarea>
          </TerminalBlock>
          
          <!-- JS Input -->
          <TerminalBlock title="JavaScript">
            <textarea v-model="inputJs"
                      class="w-full h-40 p-4 bg-slate-900 dark:bg-slate-950 border border-slate-700 rounded-lg font-mono text-xs text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      placeholder="Enter your JavaScript..."></textarea>
          </TerminalBlock>
        </div>
        
        <!-- Error/Success Message -->
        <transition name="fade">
          <div v-if="playgroundMessage"
               :class="[
                 'p-4 rounded-xl text-center font-medium',
                 playgroundMessage.type === 'error' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300' : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
               ]">
            {{ playgroundMessage.text }}
          </div>
        </transition>
        
        <!-- Output Section -->
        <TerminalBlock title="Inlined HTML Output">
          <template #actions>
            <button @click="copyOutput"
                    :disabled="!outputHtml"
                    class="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {{ outputCopied ? '✓ Copied' : 'Copy' }}
            </button>
            <button @click="downloadOutput"
                    :disabled="!outputHtml"
                    class="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Download
            </button>
            <button @click="previewOutput"
                    :disabled="!outputHtml"
                    class="px-4 py-2 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Preview
            </button>
          </template>
          <textarea v-model="outputHtml"
                    readonly
                    class="w-full h-105 p-4 bg-slate-900 dark:bg-slate-950 border border-slate-700 rounded-lg font-mono text-xs text-slate-100 resize-none"
                    placeholder="Inlined HTML will appear here..."></textarea>
        </TerminalBlock>
      </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import TerminalBlock from './TerminalBlock.vue'

// State
const inputHtml = ref('')
const inputCss = ref('')
const inputJs = ref('')
const outputHtml = ref('')
const isProcessing = ref(false)
const outputCopied = ref(false)
const playgroundMessage = ref(null)
const selectedPreset = ref('')

// Presets
const presets = [
  {
    name: 'Basic Example',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Inline Assets Demo</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <div class="badge">✨ New</div>
    <h1 class="title">Welcome to Inline Assets</h1>
    <p class="description">Transform your HTML into self-contained files with zero dependencies</p>
    <div class="features">
      <div class="feature">🚀 Fast</div>
      <div class="feature">💎 Beautiful</div>
      <div class="feature">🎯 Simple</div>
    </div>
  </div>
  <script src="script.js"><\/script>
</body>
</html>`,
    css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.container {
  text-align: center;
  max-width: 600px;
  animation: fadeInUp 0.8s ease-out;
}

.badge {
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  color: white;
  padding: 8px 20px;
  border-radius: 50px;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
  animation: pulse 2s infinite;
}

.title {
  font-size: 48px;
  font-weight: 900;
  color: white;
  margin-bottom: 16px;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
}

.description {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 40px;
  line-height: 1.6;
}

.features {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.feature {
  background: white;
  color: #667eea;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.feature:hover {
  transform: translateY(-4px);
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

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}`,
    js: `console.log('🎉 Inline Assets Demo Loaded!');

document.addEventListener('DOMContentLoaded', () => {
  const features = document.querySelectorAll('.feature');
  
  features.forEach((feature, index) => {
    feature.style.animationDelay = \`\${index * 0.1}s\`;
    feature.style.animation = 'fadeInUp 0.6s ease-out forwards';
  });
});`
  },
  {
    name: 'Card Design',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Product Card</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="card">
    <div class="card-header">
      <div class="icon">🎨</div>
      <span class="status">Premium</span>
    </div>
    <h2 class="card-title">Design System Pro</h2>
    <p class="card-description">A complete design system with 500+ components, templates, and resources for modern web applications.</p>
    <div class="card-stats">
      <div class="stat">
        <div class="stat-value">500+</div>
        <div class="stat-label">Components</div>
      </div>
      <div class="stat">
        <div class="stat-value">50k+</div>
        <div class="stat-label">Downloads</div>
      </div>
      <div class="stat">
        <div class="stat-value">4.9</div>
        <div class="stat-label">Rating</div>
      </div>
    </div>
    <button class="btn" id="actionBtn">
      <span class="btn-text">Get Started</span>
      <span class="btn-icon">→</span>
    </button>
  </div>
  <script src="script.js"><\/script>
</body>
</html>`,
    css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
  padding: 20px;
}

.card {
  max-width: 420px;
  width: 100%;
  background: white;
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.6s ease-out;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  box-shadow: 0 8px 16px rgba(102, 126, 234, 0.3);
}

.status {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  color: white;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.card-title {
  font-size: 28px;
  font-weight: 800;
  color: #1e293b;
  margin-bottom: 12px;
}

.card-description {
  font-size: 15px;
  color: #64748b;
  line-height: 1.7;
  margin-bottom: 28px;
}

.card-stats {
  display: flex;
  gap: 20px;
  margin-bottom: 28px;
  padding: 20px;
  background: #f8fafc;
  border-radius: 16px;
}

.stat {
  flex: 1;
  text-align: center;
}

.stat-value {
  font-size: 24px;
  font-weight: 800;
  color: #667eea;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: #94a3b8;
  font-weight: 600;
}

.btn {
  width: 100%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 16px 24px;
  border-radius: 14px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.4);
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.5);
}

.btn:active {
  transform: translateY(0);
}

.btn-icon {
  font-size: 20px;
  transition: transform 0.3s ease;
}

.btn:hover .btn-icon {
  transform: translateX(4px);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}`,
    js: `console.log('🎨 Card Design Demo Loaded!');

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('actionBtn');
  const stats = document.querySelectorAll('.stat');
  
  // Animate stats on load
  stats.forEach((stat, index) => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      stat.style.transition = 'all 0.5s ease';
      stat.style.opacity = '1';
      stat.style.transform = 'translateY(0)';
    }, 300 + index * 100);
  });
  
  // Button click effect
  btn.addEventListener('click', () => {
    btn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      btn.style.transform = '';
    }, 150);
    
    console.log('✨ Button clicked! Ready to get started!');
  });
});`
  },
  {
    name: 'Animation',
    html: `<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="box"></div>
  <script src="script.js"><\/script>
</body>
</html>`,
    css: `body {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #0f172a;
}

.box {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 20px;
  animation: rotate 3s infinite;
}

@keyframes rotate {
  0%, 100% { transform: rotate(0deg) scale(1); }
  50% { transform: rotate(180deg) scale(1.2); }
}`,
    js: `console.log('Animation loaded!');`
  }
]

// Methods
function loadPreset(preset) {
  selectedPreset.value = preset.name
  inputHtml.value = preset.html
  inputCss.value = preset.css
  inputJs.value = preset.js
  outputHtml.value = ''
  playgroundMessage.value = null
  
  // Automatically process after loading preset
  setTimeout(() => {
    processInline()
  }, 100)
}

function resetPlayground() {
  inputHtml.value = ''
  inputCss.value = ''
  inputJs.value = ''
  outputHtml.value = ''
  selectedPreset.value = ''
  playgroundMessage.value = null
}

function processInline() {
  if (!inputHtml.value.trim()) {
    playgroundMessage.value = { type: 'error', text: 'Please enter some HTML' }
    setTimeout(() => { playgroundMessage.value = null }, 3000)
    return
  }

  isProcessing.value = true
  playgroundMessage.value = null

  try {
    let html = inputHtml.value

    // Inline CSS
    if (inputCss.value.trim()) {
      // Remove existing <link> tags for style.css
      html = html.replace(/<link[^>]*href=["']style\.css["'][^>]*>/gi, '')
      
      // Add inline <style> tag
      const styleTag = `<style>${inputCss.value}</style>`
      if (html.includes('</head>')) {
        html = html.replace('</head>', `  ${styleTag}\n</head>`)
      } else if (html.includes('<body>')) {
        html = html.replace('<body>', `${styleTag}\n<body>`)
      } else {
        html = styleTag + '\n' + html
      }
    }

    // Inline JavaScript
    if (inputJs.value.trim()) {
      // Remove existing <script> tags for script.js
      html = html.replace(/<script[^>]*src=["']script\.js["'][^>]*><\/script>/gi, '')
      
      // Add inline <script> tag
      const scriptTag = `<script>${inputJs.value}<\/script>`
      if (html.includes('</body>')) {
        html = html.replace('</body>', `  ${scriptTag}\n</body>`)
      } else {
        html = html + '\n' + scriptTag
      }
    }

    outputHtml.value = html
    playgroundMessage.value = { type: 'success', text: '✓ Assets inlined successfully!' }
    setTimeout(() => { playgroundMessage.value = null }, 3000)
  } catch (error) {
    playgroundMessage.value = { type: 'error', text: `Error: ${error.message}` }
    setTimeout(() => { playgroundMessage.value = null }, 5000)
  } finally {
    isProcessing.value = false
  }
}

function copyOutput() {
  if (!outputHtml.value) return
  
  navigator.clipboard.writeText(outputHtml.value)
  outputCopied.value = true
  setTimeout(() => { outputCopied.value = false }, 2000)
}

function downloadOutput() {
  if (!outputHtml.value) return
  
  const blob = new Blob([outputHtml.value], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'inlined.html'
  a.click()
  URL.revokeObjectURL(url)
}

function previewOutput() {
  if (!outputHtml.value) return
  
  const blob = new Blob([outputHtml.value], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  window.open(url, '_blank')
}

// Load default preset on mount
onMounted(() => {
  loadPreset(presets[0])
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
</style>

