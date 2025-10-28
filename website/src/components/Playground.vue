<template>
  <section id="playground" class="playground">
    <div class="container">
      <h2 class="section-title">Live Playground</h2>
      <p class="section-subtitle">Try inlining in your browser (HTML/CSS/JS)</p>

      <!-- Preset Examples -->
      <div class="preset-controls">
        <label for="preset-select" class="preset-label">Load Example:</label>
        <select 
          id="preset-select"
          v-model="selectedPreset" 
          @change="loadPreset"
          class="preset-select"
          aria-label="Select a preset example"
        >
          <option value="">-- Choose Example --</option>
          <option value="default">Basic Example</option>
          <option value="landing">Landing Page</option>
          <option value="email">Email Template</option>
          <option value="widget">Widget/Component</option>
        </select>
        <button 
          class="btn btn-secondary" 
          @click="resetToDefault"
          aria-label="Reset playground to default state"
        >
          Reset
        </button>
        <button 
          class="btn btn-secondary" 
          @click="shareURL"
          aria-label="Share current playground state via URL"
        >
          {{ urlCopied ? '✓ Copied!' : 'Share URL' }}
        </button>
      </div>

      <!-- Error Message -->
      <div v-if="errorMessage" class="error-banner" role="alert" aria-live="polite">
        <span class="error-icon">⚠️</span>
        <span class="error-text">{{ errorMessage }}</span>
        <button 
          class="error-close" 
          @click="errorMessage = ''"
          aria-label="Close error message"
        >
          ×
        </button>
      </div>

      <!-- Success Message -->
      <div v-if="successMessage" class="success-banner" role="status" aria-live="polite">
        <span class="success-icon">✓</span>
        <span class="success-text">{{ successMessage }}</span>
      </div>

      <div class="grid">
        <div class="panel panel-left">
          <div class="section">
            <div class="section-head">
              <h3 id="html-label">HTML</h3>
            </div>
            <textarea 
              v-model="html" 
              class="editor" 
              spellcheck="false"
              aria-labelledby="html-label"
              aria-describedby="html-description"
            ></textarea>
            <span id="html-description" class="sr-only">Enter your HTML content here</span>
          </div>

          <div class="section">
            <div class="section-head with-control">
              <h3 id="css-label">CSS</h3>
              <label class="inline-control">
                <span>Position</span>
                <select 
                  v-model="cssInsertPosition"
                  aria-label="CSS insertion position"
                >
                  <option value="original">original</option>
                  <option value="head-start">head-start</option>
                  <option value="head-end">head-end</option>
                </select>
              </label>
            </div>
            <textarea 
              v-model="css" 
              class="editor" 
              spellcheck="false"
              aria-labelledby="css-label"
              aria-describedby="css-description"
            ></textarea>
            <span id="css-description" class="sr-only">Enter your CSS content here</span>
          </div>

          <div class="section">
            <div class="section-head">
              <h3 id="js-label">JavaScript</h3>
            </div>
            <textarea 
              v-model="js" 
              class="editor" 
              spellcheck="false"
              aria-labelledby="js-label"
              aria-describedby="js-description"
            ></textarea>
            <span id="js-description" class="sr-only">Enter your JavaScript content here</span>
          </div>

          <div class="controls-bottom">
            <button 
              class="btn btn-primary" 
              @click="runInline"
              :disabled="isLoading"
              aria-label="Process and inline assets"
            >
              <span v-if="isLoading" class="spinner" aria-hidden="true"></span>
              {{ isLoading ? 'Processing...' : 'Inline Now' }}
            </button>
          </div>
        </div>

        <div class="panel panel-right">
          <div class="section">
            <div class="section-head">
              <h3 id="result-label">Result</h3>
            </div>
            <textarea 
              class="editor result" 
              :value="result" 
              readonly
              aria-labelledby="result-label"
              aria-describedby="result-description"
            ></textarea>
            <span id="result-description" class="sr-only">Inlined HTML output</span>
          </div>

          <div class="stats" role="region" aria-label="File size statistics">
            <div><span class="stat-label">Original</span><span class="stat-val">{{ prettyBytes(stats.originalSize) }}</span></div>
            <div><span class="stat-label">Inlined</span><span class="stat-val">{{ prettyBytes(stats.inlinedSize) }}</span></div>
            <div><span class="stat-label">Reduced</span><span class="stat-val">{{ prettyBytes(stats.reducedBytes) }}</span></div>
          </div>

          <div class="actions sticky-bottom">
            <button 
              class="btn" 
              @click="copyResult"
              :disabled="!result"
              aria-label="Copy result to clipboard"
            >
              {{ copied ? '✓ Copied!' : 'Copy Result' }}
            </button>
            <button 
              class="btn" 
              @click="downloadResult"
              :disabled="!result"
              aria-label="Download result as HTML file"
            >
              Download HTML
            </button>
            <button 
              class="btn" 
              @click="openPreview"
              :disabled="!result"
              aria-label="Open result in new tab"
            >
              Open Preview
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { inlineInBrowser } from '@/composables/useInline.js';

// Preset examples
const presets = {
  default: {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Playground</title>
  <link rel="stylesheet" href="index.css">
  <script src="index.js"><\/script>
  <link rel="icon" href="favicon.svg">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <h1>Hello Inline</h1>
  <p>Change HTML/CSS/JS and click Inline Now.</p>
  <img src="logo.svg" alt="logo">
</body>
</html>`,
    css: `body { font-family: system-ui, sans-serif; padding: 24px; }
h1 { color: #667eea; }`,
    js: `console.log('hello from js')`,
    cssInsertPosition: 'original'
  },
  landing: {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Product Landing Page</title>
  <link rel="stylesheet" href="styles.css">
  <script src="app.js"><\/script>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <header>
    <h1>Amazing Product</h1>
    <p class="tagline">The best solution for your needs</p>
  </header>
  <main>
    <section class="features">
      <div class="feature">Fast</div>
      <div class="feature">Reliable</div>
      <div class="feature">Secure</div>
    </section>
    <button id="cta">Get Started</button>
  </main>
</body>
</html>`,
    css: `* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: system-ui, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; }
header { text-align: center; margin-bottom: 3rem; }
h1 { font-size: 3rem; margin-bottom: 1rem; }
.tagline { font-size: 1.5rem; opacity: 0.9; }
.features { display: flex; gap: 2rem; margin-bottom: 2rem; }
.feature { background: rgba(255,255,255,0.2); padding: 1.5rem 2rem; border-radius: 12px; font-weight: 600; }
#cta { background: white; color: #667eea; border: none; padding: 1rem 3rem; font-size: 1.2rem; border-radius: 8px; cursor: pointer; font-weight: 700; transition: transform 0.2s; }
#cta:hover { transform: scale(1.05); }`,
    js: `document.getElementById('cta').addEventListener('click', () => {
  alert('Welcome! This is a single-file landing page.');
});`,
    cssInsertPosition: 'head-end'
  },
  email: {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Email Newsletter</title>
  <link rel="stylesheet" href="email.css">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <table class="email-container">
    <tr>
      <td class="header">
        <h1>Weekly Newsletter</h1>
      </td>
    </tr>
    <tr>
      <td class="content">
        <h2>Hello Subscriber!</h2>
        <p>Here's what's new this week...</p>
        <a href="#" class="button">Read More</a>
      </td>
    </tr>
    <tr>
      <td class="footer">
        <p>© 2025 Your Company</p>
      </td>
    </tr>
  </table>
</body>
</html>`,
    css: `body { margin: 0; padding: 20px; background: #f4f4f4; font-family: Arial, sans-serif; }
.email-container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; }
.header { background: #667eea; color: white; padding: 2rem; text-align: center; }
.header h1 { margin: 0; font-size: 2rem; }
.content { padding: 2rem; }
.content h2 { color: #333; margin-bottom: 1rem; }
.content p { color: #666; line-height: 1.6; margin-bottom: 1.5rem; }
.button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; }
.footer { background: #f8f8f8; padding: 1rem; text-align: center; color: #999; font-size: 0.9rem; }`,
    js: `// Email templates typically don't use JavaScript`,
    cssInsertPosition: 'head-start'
  },
  widget: {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Embeddable Widget</title>
  <link rel="stylesheet" href="widget.css">
  <script src="widget.js"><\/script>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
  <div class="widget">
    <div class="widget-header">
      <h3>Live Stats</h3>
      <button id="refresh">↻</button>
    </div>
    <div class="widget-body">
      <div class="stat">
        <span class="label">Users</span>
        <span class="value" id="users">1,234</span>
      </div>
      <div class="stat">
        <span class="label">Revenue</span>
        <span class="value" id="revenue">$5,678</span>
      </div>
    </div>
  </div>
</body>
</html>`,
    css: `body { margin: 0; padding: 20px; background: #f0f0f0; font-family: system-ui, sans-serif; }
.widget { max-width: 300px; background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden; }
.widget-header { background: #667eea; color: white; padding: 1rem; display: flex; justify-content: space-between; align-items: center; }
.widget-header h3 { margin: 0; font-size: 1.1rem; }
#refresh { background: rgba(255,255,255,0.2); border: none; color: white; font-size: 1.2rem; width: 32px; height: 32px; border-radius: 6px; cursor: pointer; }
.widget-body { padding: 1.5rem; }
.stat { display: flex; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid #eee; }
.stat:last-child { border-bottom: none; }
.label { color: #666; font-size: 0.9rem; }
.value { font-weight: 700; color: #333; font-size: 1.1rem; }`,
    js: `document.getElementById('refresh').addEventListener('click', () => {
  document.getElementById('users').textContent = Math.floor(Math.random() * 10000);
  document.getElementById('revenue').textContent = '$' + Math.floor(Math.random() * 100000).toLocaleString();
});`,
    cssInsertPosition: 'original'
  }
};

const html = ref('');
const css = ref('');
const js = ref('');
const cssInsertPosition = ref('original');
const result = ref('');
const stats = ref({ originalSize: 0, inlinedSize: 0, reducedBytes: 0 });
const isLoading = ref(false);
const errorMessage = ref('');
const successMessage = ref('');
const copied = ref(false);
const urlCopied = ref(false);
const selectedPreset = ref('');

function runInline() {
  isLoading.value = true;
  errorMessage.value = '';
  successMessage.value = '';
  
  // Use setTimeout to allow UI to update with loading state
  setTimeout(() => {
    try {
      const { html: out, stats: s, error } = inlineInBrowser({
        html: html.value,
        css: css.value,
        js: js.value,
        cssInsertPosition: cssInsertPosition.value,
      });
      
      if (error) {
        errorMessage.value = error;
        result.value = '';
        stats.value = { originalSize: 0, inlinedSize: 0, reducedBytes: 0 };
      } else {
        result.value = out;
        stats.value = s;
        successMessage.value = 'Successfully inlined assets!';
        setTimeout(() => { successMessage.value = ''; }, 3000);
      }
    } catch (err) {
      errorMessage.value = err.message || 'An unexpected error occurred';
      result.value = '';
      stats.value = { originalSize: 0, inlinedSize: 0, reducedBytes: 0 };
    } finally {
      isLoading.value = false;
    }
  }, 100);
}

function copyResult() {
  if (!result.value) return;
  
  navigator.clipboard.writeText(result.value)
    .then(() => {
      copied.value = true;
      successMessage.value = 'Copied to clipboard!';
      setTimeout(() => { 
        copied.value = false;
        successMessage.value = '';
      }, 2000);
    })
    .catch(() => {
      errorMessage.value = 'Failed to copy to clipboard';
    });
}

function downloadResult() {
  if (!result.value) return;
  
  try {
    const blob = new Blob([result.value], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'inline-result.html';
    a.click();
    URL.revokeObjectURL(url);
    successMessage.value = 'Downloaded successfully!';
    setTimeout(() => { successMessage.value = ''; }, 2000);
  } catch (err) {
    errorMessage.value = 'Failed to download file';
  }
}

function openPreview() {
  if (!result.value) return;
  
  try {
    const blob = new Blob([result.value], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  } catch (err) {
    errorMessage.value = 'Failed to open preview';
  }
}

function prettyBytes(n) {
  if (!n) return '0 B';
  const units = ['B','KB','MB','GB'];
  let i = 0; let num = n;
  while (num >= 1024 && i < units.length - 1) { num /= 1024; i++; }
  return `${num.toFixed(1)} ${units[i]}`;
}

function loadPreset() {
  const preset = presets[selectedPreset.value];
  if (preset) {
    html.value = preset.html;
    css.value = preset.css;
    js.value = preset.js;
    cssInsertPosition.value = preset.cssInsertPosition;
    runInline();
  }
}

function resetToDefault() {
  selectedPreset.value = 'default';
  loadPreset();
}

function shareURL() {
  try {
    const state = {
      html: html.value,
      css: css.value,
      js: js.value,
      pos: cssInsertPosition.value
    };
    const encoded = btoa(encodeURIComponent(JSON.stringify(state)));
    const url = `${window.location.origin}${window.location.pathname}#playground?state=${encoded}`;
    
    navigator.clipboard.writeText(url)
      .then(() => {
        urlCopied.value = true;
        successMessage.value = 'Share URL copied to clipboard!';
        setTimeout(() => { 
          urlCopied.value = false;
          successMessage.value = '';
        }, 3000);
      })
      .catch(() => {
        errorMessage.value = 'Failed to copy URL';
      });
  } catch (err) {
    errorMessage.value = 'Failed to generate share URL';
  }
}

function loadFromURL() {
  try {
    const hash = window.location.hash;
    const match = hash.match(/state=([^&]+)/);
    if (match) {
      const decoded = JSON.parse(decodeURIComponent(atob(match[1])));
      html.value = decoded.html || '';
      css.value = decoded.css || '';
      js.value = decoded.js || '';
      cssInsertPosition.value = decoded.pos || 'original';
      runInline();
      return true;
    }
  } catch (err) {
    console.error('Failed to load state from URL:', err);
  }
  return false;
}

// Initialize
onMounted(() => {
  // Try to load from URL first, otherwise load default
  if (!loadFromURL()) {
    resetToDefault();
  }
});
</script>

<style scoped>
.playground { padding: 6rem 1rem; background: #f8fafc; }
.container { max-width: 1200px; margin: 0 auto; }
.section-title { text-align: center; font-size: 2rem; font-weight: 800; margin-bottom: .5rem; }
.section-subtitle { text-align: center; color: #6b7280; margin-bottom: 1.5rem; }

/* Preset Controls */
.preset-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
.preset-label {
  font-size: 0.95rem;
  color: #374151;
  font-weight: 500;
}
.preset-select {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  background: #fff;
  color: #374151;
  font-size: 0.95rem;
  cursor: pointer;
  transition: border-color 0.2s;
}
.preset-select:hover {
  border-color: #667eea;
}
.preset-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Error and Success Banners */
.error-banner, .success-banner {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  border-radius: 10px;
  margin-bottom: 1rem;
  animation: slideDown 0.3s ease-out;
}
.error-banner {
  background: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
}
.success-banner {
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #166534;
}
.error-icon, .success-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}
.error-text, .success-text {
  flex: 1;
  font-size: 0.95rem;
  font-weight: 500;
}
.error-close {
  background: none;
  border: none;
  color: #991b1b;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: background 0.2s;
}
.error-close:hover {
  background: rgba(153, 27, 27, 0.1);
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Screen Reader Only */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; align-items: stretch; }
.panel { background: #fff; border: 1px solid #e5e7eb; border-radius: 14px; padding: 1rem; display: flex; flex-direction: column; min-height: 100%; }
.panel-left .section + .section { margin-top: .75rem; }
.section-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: .5rem; }
.section-head h3 { margin: 0; font-size: 1rem; color: #111827; }
.inline-control { display: inline-flex; align-items: center; gap: .35rem; font-size: .85rem; color: #374151; }
.inline-control select { border: 1px solid #e5e7eb; border-radius: 6px; padding: .25rem .5rem; background: #fff; }
.editor { width: 100%; height: 160px; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-size: .92rem; line-height: 1.55; letter-spacing: .2px; padding: .9rem; border: 1px solid #e5e7eb; border-radius: 10px; background: #0b1020; color: #e6edf3; resize: vertical; }
.editor:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}
.editor.result { min-height: 340px; }
.panel-right .result { flex: 1; height: auto; min-height: 0; }
.controls-bottom { margin-top: auto; display: flex; justify-content: flex-end; }

/* Button Styles */
.btn {
  background: #667eea;
  color: #fff;
  border: 0;
  padding: .6rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}
.btn:hover:not(:disabled) {
  background: #5568d3;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}
.btn:active:not(:disabled) {
  transform: translateY(0);
}
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.btn-primary {
  background: #667eea;
  min-width: 140px;
  justify-content: center;
}
.btn-secondary {
  background: #6b7280;
}
.btn-secondary:hover:not(:disabled) {
  background: #4b5563;
}

/* Loading Spinner */
.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

.stats { display: flex; gap: 1rem; margin: .5rem 0 1rem; color: #374151; flex-wrap: wrap; }
.stat-label { display: inline-block; min-width: 72px; font-size: .85rem; color: #6b7280; margin-right: .35rem; }
.stat-val { font-weight: 700; color: #111827; }
.actions { display: flex; gap: .5rem; flex-wrap: wrap; }
.sticky-bottom { margin-top: auto; position: sticky; bottom: 0; background: #fff; padding-top: .5rem; border-top: 1px solid #e5e7eb; }

@media (max-width: 900px) {
  .grid { grid-template-columns: 1fr; }
  .editor { height: 140px; }
  .preset-controls {
    flex-direction: column;
    align-items: stretch;
  }
  .preset-select {
    width: 100%;
  }
}
</style>


