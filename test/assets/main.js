console.log('Hello from inlined JavaScript!');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded');
  
  const h1 = document.querySelector('h1');
  if (h1) {
    h1.style.textShadow = '2px 2px 4px rgba(0,0,0,0.3)';
  }
});

