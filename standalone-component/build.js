/**
 * Build script for ScrollToTop component
 * Minifies the component and creates distribution files
 */

const fs = require('fs');
const path = require('path');

// Simple minifier function (removes comments, extra whitespace)
function minify(code) {
  return code
    // Remove single-line comments
    .replace(/\/\/.*/g, '')
    // Remove multi-line comments
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Remove extra whitespace
    .replace(/\s+/g, ' ')
    // Remove whitespace around operators
    .replace(/\s*([{}();,:])\s*/g, '$1')
    // Remove leading/trailing whitespace
    .trim();
}

// Create dist directory
const distDir = path.join(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Read source file
const sourceFile = path.join(__dirname, 'scroll-to-top.js');
const sourceCode = fs.readFileSync(sourceFile, 'utf8');

// Minify and save
const minifiedCode = minify(sourceCode);
const minifiedFile = path.join(distDir, 'scroll-to-top.min.js');
fs.writeFileSync(minifiedFile, minifiedCode);

// Copy unminified version
const unminifiedFile = path.join(distDir, 'scroll-to-top.js');
fs.writeFileSync(unminifiedFile, sourceCode);

// Generate stats
const originalSize = Buffer.byteLength(sourceCode, 'utf8');
const minifiedSize = Buffer.byteLength(minifiedCode, 'utf8');
const savings = ((1 - minifiedSize / originalSize) * 100).toFixed(2);

console.log('✓ Build completed successfully!');
console.log('');
console.log('Files generated:');
console.log(`  - ${path.relative(__dirname, unminifiedFile)} (${(originalSize / 1024).toFixed(2)} KB)`);
console.log(`  - ${path.relative(__dirname, minifiedFile)} (${(minifiedSize / 1024).toFixed(2)} KB)`);
console.log('');
console.log(`Size reduction: ${savings}%`);
