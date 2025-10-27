/**
 * Test script for standalone inlineAssets function
 *
 * Run: node test/test-standalone.js
 */

import { inlineAssets } from '../src/index.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function runTest() {
  console.log('🧪 Testing vite-plugin-inline (standalone mode)\n');

  // Create a copy of test HTML for testing
  const originalHtml = path.join(__dirname, 'index.html');
  const testHtml = path.join(__dirname, 'test-output.html');

  // Copy test files
  fs.copyFileSync(originalHtml, testHtml);

  console.log('📄 Test HTML created:', testHtml);
  console.log('📁 Base directory:', __dirname);
  console.log('\n--- Starting inline process ---\n');

  try {
    const result = await inlineAssets({
      htmlPath: testHtml,
      baseDir: __dirname,
      css: true,
      js: true,
      svg: {
        img: true,
        link: true,
      },
      removeInlinedFiles: false, // Keep files for inspection
      cleanupEmptyDirs: false,
    });

    console.log('\n--- Test Results ---\n');
    console.log('✅ Success:', result.success);
    console.log('📦 Inlined files:', result.inlinedFiles.length);
    if (result.errors.length > 0) {
      console.log('❌ Errors:', result.errors.length);
      result.errors.forEach((error) => {
        console.log(`  - ${error}`);
      });
    }

    if (result.inlinedFiles.length > 0) {
      console.log('\nInlined files:');
      result.inlinedFiles.forEach((file) => {
        console.log(`  - ${file}`);
      });
    }

    if (result.errors.length > 0) {
      console.log('\nErrors:');
      result.errors.forEach((error) => {
        console.log(`  - ${error}`);
      });
    }

    // Verify output
    console.log('\n--- Verification ---\n');
    console.log('✓ CSS inlined:', result.inlinedFiles.filter((file) => file.endsWith('.css')).length);
    console.log('✓ JS inlined:', result.inlinedFiles.filter((file) => file.endsWith('.js')).length);
    console.log('✓ SVG inlined:', result.inlinedFiles.filter((file) => file.endsWith('.svg')).length);

    console.log('\n📄 Output file:', testHtml);
    console.log('🎉 Test complete!\n');
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

runTest();
