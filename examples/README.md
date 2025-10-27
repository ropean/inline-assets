# Examples

This directory contains complete, runnable examples for integrating `@ropean/inline-assets` with various build tools and workflows.

## 📚 Available Examples

### 1. [Vite Plugin Usage](vite-usage.js)
Basic and advanced Vite plugin configurations.

**What you'll learn:**
- Basic plugin setup
- Custom options configuration
- Excluding specific files
- Disabling logging

**Usage:**
```javascript
import inlineAssets from '@ropean/inline-assets';

export default defineConfig({
  plugins: [inlineAssets()]
});
```

---

### 2. [Standalone Function](standalone-usage.js)
Using `inlineAssets` as a standalone function with any build tool.

**What you'll learn:**
- Basic standalone usage
- Advanced options
- Custom logger integration
- Silent mode
- Error handling

**Usage:**
```javascript
import { inlineAssets } from '@ropean/inline-assets';

await inlineAssets({
  htmlPath: './dist/index.html'
});
```

---

### 3. [Webpack Integration](webpack-integration.js)
Integrating with Webpack build process.

**What you'll learn:**
- Webpack plugin hook usage
- Post-build asset inlining
- Error handling in Webpack context

**Usage:**
```javascript
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

---

### 4. [Rollup Integration](rollup-integration.js)
Integrating with Rollup build process.

**What you'll learn:**
- Rollup plugin creation
- closeBundle hook usage
- Result handling

**Usage:**
```javascript
export default {
  plugins: [{
    name: 'inline-assets',
    closeBundle: async () => {
      await inlineAssets({ htmlPath: './dist/index.html' });
    }
  }]
};
```

---

### 5. [Gulp Integration](gulp-integration.js)
Integrating with Gulp task runner.

**What you'll learn:**
- Creating Gulp tasks
- Task composition with gulp.series
- Watch mode integration
- Production build workflows

**Usage:**
```javascript
gulp.task('inline', async () => {
  await inlineAssets({ htmlPath: './dist/index.html' });
});

gulp.task('build', gulp.series('your-build-task', 'inline'));
```

---

### 6. [npm Scripts](npm-script.js)
Using as a post-build script with npm/yarn/pnpm.

**What you'll learn:**
- npm script integration
- Comprehensive error handling
- Exit codes for CI/CD
- Result reporting

**Usage:**
```json
{
  "scripts": {
    "build": "vite build",
    "postbuild": "node inline-assets.js"
  }
}
```

---

### 7. [CSS Insert Position](css-insert-position.js)
Demonstrating different CSS insertion strategies.

**What you'll learn:**
- `'original'` - Keep CSS at original position
- `'head-start'` - Move CSS to beginning of `<head>`
- `'head-end'` - Move CSS to end of `<head>`
- Visual comparisons
- Use case recommendations

**Usage:**
```javascript
inlineAssets({
  cssInsertPosition: 'original'  // or 'head-start' or 'head-end'
})
```

---

## 🚀 Quick Start

1. **Choose your build tool** from the examples above
2. **Copy the relevant example** to your project
3. **Adjust paths and options** to match your setup
4. **Run your build** and see the magic happen!

## 📖 Common Patterns

### Pattern 1: Basic Usage
```javascript
await inlineAssets({
  htmlPath: './dist/index.html'
});
```

### Pattern 2: With Options
```javascript
await inlineAssets({
  htmlPath: './dist/index.html',
  css: true,
  js: true,
  svg: { img: false, link: true },
  excludes: ['vendor.js']
});
```

### Pattern 3: With Error Handling
```javascript
const result = await inlineAssets({
  htmlPath: './dist/index.html'
});

if (!result.success) {
  console.error('Errors:', result.errors);
  process.exit(1);
}
```

### Pattern 4: With Custom Logger
```javascript
const myLogger = {
  info: (msg) => console.log('[INFO]', msg),
  success: (msg) => console.log('[✓]', msg),
  warning: (msg) => console.warn('[⚠]', msg),
  error: (msg) => console.error('[✖]', msg)
};

await inlineAssets({
  htmlPath: './dist/index.html',
  logger: myLogger
});
```

## 🎯 Use Cases

### Single-File Deployment
Perfect for:
- Email templates
- Offline HTML apps
- Documentation pages
- Landing pages
- Chrome extensions
- Electron apps

### Performance Optimization
Benefits:
- Reduces HTTP requests
- Eliminates render-blocking resources
- Faster initial page load
- Better for slow connections

## 💡 Tips

1. **Test locally first**: Use `npm link` to test before publishing
2. **Check output**: Open `dist/index.html` to verify inlining
3. **Use excludes**: Keep large vendor files external if needed
4. **Disable logging**: Use `logger: false` in CI/CD environments
5. **Choose CSS position**: Use `cssInsertPosition` to control CSS placement

## 🐛 Troubleshooting

### Example not working?
- Check Node.js version (requires >= 14.18.0)
- Verify file paths are correct
- Ensure HTML file exists before inlining
- Check console for error messages

### Assets not inlining?
- Verify `baseDir` points to correct directory
- Check that asset files exist
- Ensure paths in HTML are relative
- Review `excludes` option

### Need help?
- Read the [main documentation](../README.md)
- Check [TypeScript definitions](../src/index.d.ts)
- Open an [issue](https://github.com/ropean/inline-assets/issues)

## 📚 Additional Resources

- [Main README](../README.md) - Full documentation
- [TypeScript Definitions](../src/index.d.ts) - API reference
- [CSS Insert Position Guide](../CSS_INSERT_POSITION.md) - CSS positioning details

---

**Happy coding!** 🚀

If you find these examples helpful, please consider starring the repository! ⭐

