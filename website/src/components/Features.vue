<template>
  <section id="features" class="features">
    <div class="container">
      <h2 class="section-title">Features</h2>
      <p class="section-subtitle">Everything you need to inline assets like a pro</p>

      <div class="grid">
        <article class="card">
          <div class="icon">🚀</div>
          <h3>Zero Dependencies</h3>
          <p>No external packages. Lightweight and secure by design.</p>
        </article>

        <article class="card">
          <div class="icon">🔌</div>
          <h3>Dual Mode</h3>
          <p>Use as a Vite plugin or a standalone function with any tool.</p>
        </article>

        <article class="card">
          <div class="icon">🎨</div>
          <h3>Inline CSS</h3>
          <p>Convert <code>&lt;link&gt;</code> to inline <code>&lt;style&gt;</code> tags.</p>
        </article>

        <article class="card">
          <div class="icon">📦</div>
          <h3>Inline JavaScript</h3>
          <p>Replace <code>&lt;script src&gt;</code> with inline <code>&lt;script&gt;</code>.</p>
        </article>

        <article class="card">
          <div class="icon">🖼️</div>
          <h3>Inline SVG</h3>
          <p>Convert external SVG files into base64 data URIs.</p>
        </article>

        <article class="card">
          <div class="icon">⚙️</div>
          <h3>Configurable</h3>
          <p>Control CSS position, exclusions, logging, and more.</p>
        </article>
      </div>
    </div>
  </section>
  
</template>

<script setup>
</script>

<style scoped>
.features {
  padding: 6rem 2rem;
  background: #ffffff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2.25rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.section-subtitle {
  text-align: center;
  color: #6b7280;
  margin-bottom: 2.5rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 1.5rem;
  transition: transform .2s ease, box-shadow .2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.08);
}

.icon {
  font-size: 2rem;
  margin-bottom: .75rem;
}

h3 {
  margin: .25rem 0 .5rem;
  font-size: 1.125rem;
  color: #111827;
}

p {
  color: #4b5563;
}

code { 
  background: #f3f4f6; 
  padding: .1rem .35rem; 
  border-radius: 6px; 
}

@media (max-width: 768px) {
  .features { padding: 4rem 1rem; }
}
</style>


