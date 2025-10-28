<template>
  <section class="use-cases">
    <div class="container">
      <h2 class="section-title">Use Cases</h2>
      <div class="grid">
        <div class="case">
          <div class="icon">📧</div>
          <h3>Email Templates</h3>
          <p>Inline styles and scripts for better client compatibility.</p>
        </div>
        <div class="case">
          <div class="icon">📱</div>
          <h3>Offline Apps</h3>
          <p>Bundle everything into one HTML for offline usage.</p>
        </div>
        <div class="case">
          <div class="icon">🧩</div>
          <h3>Chrome Extensions</h3>
          <p>Reduce files and simplify packaging and review.</p>
        </div>
        <div class="case">
          <div class="icon">📄</div>
          <h3>Docs & Landing</h3>
          <p>Fast, single-file static pages with no external requests.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.use-cases { padding: 5rem 2rem; background: #ffffff; }
.container { max-width: 1100px; margin: 0 auto; }
.section-title { text-align:center; font-size: 2rem; font-weight: 800; margin-bottom: 2rem; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; }
.case { background: #f8fafc; border: 1px solid #e5e7eb; border-radius: 14px; padding: 1.25rem; transition: transform .2s ease; }
.case:hover { transform: translateY(-4px); }
.icon { font-size: 1.75rem; margin-bottom: .5rem; }
h3 { margin: .25rem 0 .5rem; font-size: 1.1rem; }
p { color: #4b5563; }
</style>


