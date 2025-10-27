console.log('🚀 @ropean/inline-assets - Test Demo Loaded');

document.addEventListener('DOMContentLoaded', () => {
  console.log('✅ DOM loaded successfully');

  // Animate stats with counter effect
  const animateValue = (element, start, end, duration, suffix = '') => {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      element.textContent = Math.floor(current) + suffix;
    }, 16);
  };

  // Simulate stats
  setTimeout(() => {
    const fileCount = document.getElementById('fileCount');
    const sizeReduction = document.getElementById('sizeReduction');
    const buildTime = document.getElementById('buildTime');

    if (fileCount) animateValue(fileCount, 0, 4, 1000);
    if (sizeReduction) animateValue(sizeReduction, 0, 67, 1200, '%');
    if (buildTime) animateValue(buildTime, 0, 342, 1000, 'ms');
  }, 500);

  // Add interactive hover effects to feature cards
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Add click effect to code blocks
  const codeBlocks = document.querySelectorAll('.code-example pre');
  codeBlocks.forEach(block => {
    block.style.cursor = 'pointer';
    block.title = 'Click to copy';

    block.addEventListener('click', () => {
      const code = block.textContent;
      navigator.clipboard.writeText(code).then(() => {
        // Show copied feedback
        const originalBg = block.style.background;
        block.style.background = 'rgba(76, 175, 80, 0.3)';
        block.style.border = '1px solid rgba(76, 175, 80, 0.5)';

        setTimeout(() => {
          block.style.background = originalBg;
          block.style.border = '1px solid rgba(255, 255, 255, 0.1)';
        }, 500);

        console.log('📋 Code copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy:', err);
      });
    });
  });

  // Add parallax effect to logo
  const logo = document.querySelector('.logo');
  if (logo) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      logo.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  // Console art
  console.log(`
  ╔═══════════════════════════════════════╗
  ║   @ropean/inline-assets               ║
  ║   Zero-Dependency Asset Inlining      ║
  ║                                       ║
  ║   🚀 Fast  🔌 Flexible  📦 Simple    ║
  ╚═══════════════════════════════════════╝
  `);

  console.log('📚 Documentation: https://github.com/ropean/inline-assets');
  console.log('📦 npm: https://www.npmjs.com/package/@ropean/inline-assets');
});

