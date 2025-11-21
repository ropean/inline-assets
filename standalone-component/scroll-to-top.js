/**
 * ScrollToTop - Standalone Component
 * A lightweight, zero-dependency scroll-to-top button with rocket animation
 * @version 1.0.0
 * @license MIT
 */

(function() {
  'use strict';

  // Component CSS
  const styles = `
    .scroll-to-top-btn {
      position: fixed;
      bottom: 3rem;
      right: 0rem;
      font-size: 3rem;
      z-index: 9999;
      cursor: pointer;
      filter: drop-shadow(0 10px 8px rgba(0, 0, 0, 0.04)) drop-shadow(0 4px 3px rgba(0, 0, 0, 0.1));
      transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      opacity: 0;
      transform: translateY(10px) scale(0.95);
      pointer-events: none;
      background: transparent;
      border: none;
      padding: 0;
      margin: 0;
      line-height: 1;
    }

    .scroll-to-top-btn.visible {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }

    .scroll-to-top-btn.launching {
      transition: opacity 0.3s ease;
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
      font-size: 0.65em;
    }

    .scroll-to-top-btn:hover .flame {
      opacity: 0.5;
      animation: flicker 0.3s infinite;
    }

    .scroll-to-top-btn.launching .flame {
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
  `;

  class ScrollToTop {
    constructor(options = {}) {
      this.options = {
        showAfter: window.innerHeight, // Show after scrolling one viewport height
        animationDuration: 1500,
        scrollDelay: 500,
        rocketEmoji: '🚀',
        flameEmoji: '🔥',
        ...options
      };

      this.button = null;
      this.rocketIcon = null;
      this.flameIcon = null;
      this.isLaunching = false;
      this.launchProgress = 0;

      this.init();
    }

    init() {
      // Inject styles
      this.injectStyles();

      // Create button
      this.createButton();

      // Attach event listeners
      this.attachEventListeners();
    }

    injectStyles() {
      const styleEl = document.createElement('style');
      styleEl.textContent = styles;
      document.head.appendChild(styleEl);
    }

    createButton() {
      this.button = document.createElement('button');
      this.button.className = 'scroll-to-top-btn';
      this.button.setAttribute('aria-label', 'Scroll to top');

      const wrapper = document.createElement('span');
      wrapper.className = 'rocket-wrapper';

      this.rocketIcon = document.createElement('span');
      this.rocketIcon.className = 'rocket-icon';
      this.rocketIcon.textContent = this.options.rocketEmoji;

      this.flameIcon = document.createElement('span');
      this.flameIcon.className = 'flame';
      this.flameIcon.textContent = this.options.flameEmoji;

      wrapper.appendChild(this.rocketIcon);
      wrapper.appendChild(this.flameIcon);
      this.button.appendChild(wrapper);

      document.body.appendChild(this.button);

      // Position flame
      this.updateFlamePosition();
    }

    updateFlamePosition() {
      if (!this.rocketIcon) return;

      const rect = this.rocketIcon.getBoundingClientRect();
      const rocketHeight = rect.height;
      const flameBottom = -rocketHeight * 0.4;

      this.flameIcon.style.bottom = `${flameBottom}px`;
      this.flameIcon.style.left = '50%';
      this.flameIcon.style.transform = 'translateX(-50%) rotate(180deg)';
    }

    attachEventListeners() {
      window.addEventListener('scroll', () => this.handleScroll());
      this.button.addEventListener('click', () => this.launch());
    }

    handleScroll() {
      if (!this.isLaunching) {
        if (window.scrollY > this.options.showAfter) {
          this.button.classList.add('visible');
        } else {
          this.button.classList.remove('visible');
        }
      }
    }

    launch() {
      this.isLaunching = true;
      this.button.classList.add('launching');
      this.launchProgress = 0;

      const startTime = Date.now();
      const duration = this.options.animationDuration;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Custom easing
        if (progress < 0.3) {
          this.launchProgress = progress * 0.1 / 0.3;
        } else {
          this.launchProgress = 0.1 + (progress - 0.3) * 0.9 / 0.7;
        }

        // Update position
        const viewportHeight = window.innerHeight;
        const startBottom = 48; // 3rem = 48px
        const endTop = -100;
        const totalDistance = viewportHeight + startBottom + Math.abs(endTop);
        const currentDistance = totalDistance * this.launchProgress;
        const currentBottom = startBottom + currentDistance;

        this.button.style.bottom = `${currentBottom}px`;

        // Update flame size
        const baseFontSize = 0.65;
        const sizeMultiplier = 1 + this.launchProgress * 0.6;
        this.flameIcon.style.fontSize = `${baseFontSize * sizeMultiplier}em`;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          // Reset after animation
          setTimeout(() => {
            this.isLaunching = false;
            this.button.classList.remove('launching', 'visible');
            this.button.style.bottom = '3rem';
            this.button.style.right = '0rem';
            this.launchProgress = 0;
          }, 100);
        }
      };

      animate();

      // Trigger scroll
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, this.options.scrollDelay);
    }

    destroy() {
      if (this.button) {
        this.button.remove();
      }
    }
  }

  // Export for different module systems
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScrollToTop;
  } else if (typeof define === 'function' && define.amd) {
    define([], function() {
      return ScrollToTop;
    });
  } else {
    window.ScrollToTop = ScrollToTop;
  }
})();
