# Quick Start Guide

Get started with **vite-plugin-inline** in less than 5 minutes!

## 📦 Installation

```bash
npm install vite-plugin-inline -D
```

## 🚀 Quick Setup

### Option 1: Vite Plugin (Recommended for Vite users)

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import viteInlineAssets from 'vite-plugin-inline';

export default defineConfig({
  plugins: [
    viteInlineAssets()  // That's it! 🎉
  ]
});
```

Build your project:
```bash
npm run build
```

Your `dist/index.html` will now have all CSS and JS inlined!

### Option 2: Standalone Function (For any build tool)

Create a file `inline-assets.js`:

```javascript
import { inlineAssets } from 'vite-plugin-inline';

await inlineAssets({
  htmlPath: './dist/index.html'
});
```

Add to `package.json`:
```json
{
  "scripts": {
    "build": "your-build-command",
    "postbuild": "node inline-assets.js"
  }
}
```

## 🎛️ Common Configurations

### Inline Everything
```javascript
viteInlineAssets({
  css: true,
  js: true,
  svg: { img: true, link: true }
})
```

### Exclude Large Files
```javascript
viteInlineAssets({
  excludes: [
    'vendor.js',
    'assets/large-library.js'
  ]
})
```

### Silent Mode (No Logging)
```javascript
viteInlineAssets({
  logger: false
})
```

### Custom Logger
```javascript
const myLogger = {
  info: (msg) => console.log(`[INFO] ${msg}`),
  success: (msg) => console.log(`[✓] ${msg}`),
  warning: (msg) => console.warn(`[⚠] ${msg}`),
  error: (msg) => console.error(`[✖] ${msg}`)
};

viteInlineAssets({
  logger: myLogger
})
```

## 📋 What Gets Inlined?

### CSS Files
**Before:**
```html
<link rel="stylesheet" href="assets/index.css">
```

**After:**
```html
<style>
  /* CSS content here */
</style>
```

### JavaScript Files
**Before:**
```html
<script src="assets/index.js"></script>
```

**After:**
```html
<script type="module">
  // JS content here
</script>
```

### SVG Files
**Before:**
```html
<link rel="icon" href="assets/favicon.svg">
<img src="assets/logo.svg">
```

**After:**
```html
<link rel="icon" href="data:image/svg+xml;base64,...">
<img src="data:image/svg+xml;base64,...">
```

## 🎯 Use Cases

### Single-File Deployment
Perfect for:
- Email templates
- Offline HTML apps
- Documentation pages
- Landing pages
- Chrome extensions

### Performance Optimization
Benefits:
- Reduces HTTP requests
- Eliminates render-blocking resources
- Faster initial page load
- Better for slow connections

## 🔧 Integration Examples

### With Webpack
```javascript
const { inlineAssets } = require('vite-plugin-inline');

module.exports = {
  plugins: [{
    apply: (compiler) => {
      compiler.hooks.done.tap('InlineAssets', async () => {
        await inlineAssets({ htmlPath: './dist/index.html' });
      });
    }
  }]
};
```

### With Rollup
```javascript
import { inlineAssets } from 'vite-plugin-inline';

export default {
  plugins: [{
    name: 'inline-assets',
    async closeBundle() {
      await inlineAssets({ htmlPath: './dist/index.html' });
    }
  }]
};
```

### With Gulp
```javascript
import { inlineAssets } from 'vite-plugin-inline';
import gulp from 'gulp';

gulp.task('inline', async () => {
  await inlineAssets({ htmlPath: './dist/index.html' });
});

gulp.task('build', gulp.series('your-build-task', 'inline'));
```

## 🐛 Troubleshooting

### Assets not inlining?
- ✅ Check that `htmlPath` is correct
- ✅ Verify assets exist in `baseDir`
- ✅ Check file paths in HTML are relative

### CSS not working?
- ✅ Ensure `cssCodeSplit: false` in Vite config (plugin does this automatically)
- ✅ Check for CSS in `<link>` tags, not `@import`

### Files not being deleted?
- ✅ Set `removeInlinedFiles: true` (default)
- ✅ Check file permissions

## 📚 Next Steps

- Read the [full documentation](README.md)
- Check out [examples](examples/)
- View [API reference](src/index.d.ts)
- See [publishing guide](PUBLISHING.md)

## 💡 Tips

1. **Test locally first**: Use `npm link` to test before publishing
2. **Check output**: Open `dist/index.html` to verify inlining
3. **Use excludes**: Keep large vendor files external if needed
4. **Disable logging**: Use `logger: false` in CI/CD environments

## 🎉 That's It!

You're ready to inline assets! If you have questions:
- 📖 Check the [README](README.md)
- 🐛 [Open an issue](https://github.com/ropean/inline-assets/issues)
- 💬 Start a [discussion](https://github.com/ropean/inline-assets/discussions)

Happy coding! 🚀

