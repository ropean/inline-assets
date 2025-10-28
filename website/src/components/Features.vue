<template>
  <section id="features" class="py-24 bg-white dark:bg-slate-950">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16 animate-slide-up">
        <h2 class="text-4xl sm:text-5xl font-black text-slate-900 dark:text-white mb-4">
          Why Choose Inline Assets?
        </h2>
        <p class="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Everything you need to create self-contained HTML files
        </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(feature, index) in features" :key="index"
             class="card p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
             :style="{ animationDelay: `${index * 0.1}s` }">
          <div class="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <div v-html="feature.icon" class="w-7 h-7 text-white"></div>
          </div>
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3">
            {{ feature.title }}
          </h3>
          <p class="text-slate-600 dark:text-slate-400 leading-relaxed">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>',
    title: 'Zero Dependencies',
    description: 'No external packages. Lightweight, secure, and easy to maintain.'
  },
  {
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/></svg>',
    title: 'Dual Mode',
    description: 'Use as a Vite plugin or standalone function with any build tool.'
  },
  {
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>',
    title: 'Single File Output',
    description: 'Combine all assets into one HTML file for easy deployment.'
  },
  {
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>',
    title: 'Inline Everything',
    description: 'CSS, JavaScript, SVG - all assets inlined automatically.'
  },
  {
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/></svg>',
    title: 'Highly Configurable',
    description: 'Control CSS position, exclusions, logging, and more.'
  },
  {
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>',
    title: 'Production Ready',
    description: 'Battle-tested and used in production by many projects.'
  },
]
</script>

