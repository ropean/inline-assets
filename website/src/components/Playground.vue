<template>
  <section id="playground" class="py-24 bg-slate-50 dark:bg-slate-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4">
          Try It Live
        </h2>
        <p class="text-xl text-slate-600 dark:text-slate-400 mb-8">
          See the magic happen in real-time
        </p>
        
        <!-- Preset Selector -->
        <div class="flex items-center justify-center gap-3 flex-wrap">
          <button v-for="preset in presets" :key="preset.name"
                  @click="loadPreset(preset)"
                  :class="[
                    'px-4 py-2 rounded-xl font-medium transition-all',
                    selectedPreset === preset.name
                      ? 'bg-gradient-primary text-white shadow-lg'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:shadow-md'
                  ]">
            {{ preset.name }}
          </button>
          <button @click="resetPlayground"
                  class="px-4 py-2 rounded-xl font-medium bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-all">
            Reset
          </button>
        </div>
      </div>
      
      <div class="space-y-6">
        <!-- Input Section -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <!-- HTML Input -->
          <TerminalBlock title="HTML">
            <textarea v-model="inputHtml"
                      class="w-full h-64 p-4 bg-slate-900 dark:bg-slate-950 border border-slate-700 rounded-lg font-mono text-sm text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      placeholder="Enter your HTML..."></textarea>
          </TerminalBlock>
          
          <!-- CSS Input -->
          <TerminalBlock title="CSS">
            <textarea v-model="inputCss"
                      class="w-full h-64 p-4 bg-slate-900 dark:bg-slate-950 border border-slate-700 rounded-lg font-mono text-sm text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      placeholder="Enter your CSS..."></textarea>
          </TerminalBlock>
          
          <!-- JS Input -->
          <TerminalBlock title="JavaScript">
            <textarea v-model="inputJs"
                      class="w-full h-64 p-4 bg-slate-900 dark:bg-slate-950 border border-slate-700 rounded-lg font-mono text-sm text-slate-100 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                      placeholder="Enter your JavaScript..."></textarea>
          </TerminalBlock>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex items-center justify-center gap-4">
          <button @click="processInline"
                  :disabled="isProcessing"
                  class="px-8 py-3 bg-gradient-primary text-white rounded-xl font-bold hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed">
            {{ isProcessing ? 'Processing...' : '✨ Inline Assets' }}
          </button>
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
                    class="w-full h-96 p-4 bg-slate-900 dark:bg-slate-950 border border-slate-700 rounded-lg font-mono text-sm text-slate-100 resize-none"
                    placeholder="Inlined HTML will appear here..."></textarea>
        </TerminalBlock>
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
<html>
<head>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>Hello World</h1>
  <p class="highlight">This is a test</p>
  <script src="script.js"><\/script>
</body>
</html>`,
    css: `body {
  font-family: Arial, sans-serif;
  margin: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.highlight {
  background: rgba(255, 255, 255, 0.2);
  padding: 10px;
  border-radius: 8px;
}`,
    js: `console.log('Hello from inline-assets!');
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('h1').style.animation = 'fadeIn 1s';
});`
  },
  {
    name: 'Card Design',
    html: `<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="card">
    <h2>Feature Card</h2>
    <p>Beautiful card with gradient background</p>
    <button onclick="handleClick()">Click Me</button>
  </div>
  <script src="script.js"><\/script>
</body>
</html>`,
    css: `.card {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

button {
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
}`,
    js: `function handleClick() {
  alert('Button clicked!');
}`
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

