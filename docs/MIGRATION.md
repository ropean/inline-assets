# Migration Guide

This guide helps you migrate from the old single-file implementation to the new modular, zero-dependency version.

## 📊 What Changed?

### File Structure
```
Old:
├── vite-plugin-inline.js    (single file)
├── vite-plugin-inline.d.ts  (types)
└── logger.ts                (TypeScript, uses chalk)

New:
└── src/
    ├── index.js             (main entry)
    ├── index.d.ts           (types)
    ├── logger.js            (zero-dependency)
    ├── inline.js            (core logic)
    └── vite-plugin.js       (Vite wrapper)
```

### Dependencies
```diff
Old:
- Requires chalk

New:
+ Zero dependencies! 🎉
```

## 🔄 Migration Steps

### Step 1: Update Import Paths

**If you were importing from the file directly:**

```javascript
// Old
import viteInlineAssets from './plugins/vite-plugin-inline.js';

// New (if published to npm)
import viteInlineAssets from 'vite-plugin-inline';

// New (if using locally)
import viteInlineAssets from './src/index.js';
```

### Step 2: Update Logger Usage (if applicable)

**If you were using the logger directly:**

```javascript
// Old
import logger from './logger.js';
logger.info('message');
logger.file('path');  // Returns colored string

// New
import { defaultLogger } from 'vite-plugin-inline';
defaultLogger.info('message');
defaultLogger.file('path');  // Returns colored string

// Or create custom logger
import { createLogger } from 'vite-plugin-inline';
const logger = createLogger();
```

### Step 3: Update Color Utilities

**If you were using chalk directly:**

```javascript
// Old
import logger from './logger.js';
logger.chalk.yellowBright('text');

// New
import { defaultLogger } from 'vite-plugin-inline';
defaultLogger.colors.brightYellow('text');
```

**Color mapping:**
```javascript
// Old (chalk)          → New (built-in)
chalk.yellowBright()    → colors.brightYellow()
chalk.hex('#color')     → colors.brightBlue() (closest match)
chalk.bold()            → colors.bold()
chalk.dim()             → colors.dim()
```

### Step 4: Update Plugin Configuration (if needed)

The plugin API remains **100% backward compatible**! No changes needed:

```javascript
// This still works exactly the same
viteInlineAssets({
  css: true,
  js: true,
  svg: { img: false, link: true },
  excludes: ['vendor.js']
})
```

### Step 5: New Features (Optional)

Take advantage of new features:

```javascript
// 1. Use as standalone function
import { inlineAssets } from 'vite-plugin-inline';

await inlineAssets({
  htmlPath: './dist/index.html',
  css: true,
  js: true
});

// 2. Custom logger
viteInlineAssets({
  logger: {
    info: (msg) => console.log(msg),
    success: (msg) => console.log(msg),
    warning: (msg) => console.warn(msg),
    error: (msg) => console.error(msg)
  }
});

// 3. Silent mode
viteInlineAssets({
  logger: false
});
```

## 🗑️ Cleanup Old Files

After migration, you can safely delete:

```bash
# Old files (no longer needed)
rm vite-plugin-inline.js
rm vite-plugin-inline.d.ts
rm logger.ts

# Remove chalk dependency
npm uninstall chalk
```

## ⚠️ Breaking Changes

### Logger API Changes

If you were using the logger directly:

1. **`logger.chalk` is now `logger.colors`**
   ```javascript
   // Old
   logger.chalk.yellowBright('text')
   
   // New
   logger.colors.brightYellow('text')
   ```

2. **`logger.newline()` signature changed**
   ```javascript
   // Old
   logger.newline(1, 'message')
   
   // New
   logger.newline(1)  // No message parameter
   ```

3. **Hex colors not supported**
   ```javascript
   // Old
   logger.chalk.hex('#646cff')('text')
   
   // New (use closest built-in color)
   logger.colors.brightBlue('text')
   ```

### No Breaking Changes for Plugin Users

If you only used the plugin (not the logger directly), there are **zero breaking changes**! 🎉

## 📝 Code Comparison

### Before (Old Implementation)

```javascript
// vite.config.js
import viteInlineAssets from './plugins/vite-plugin-inline.js';

export default defineConfig({
  plugins: [
    viteInlineAssets({
      css: true,
      js: true
    })
  ]
});
```

### After (New Implementation)

```javascript
// vite.config.js
import viteInlineAssets from 'vite-plugin-inline';  // From npm

export default defineConfig({
  plugins: [
    viteInlineAssets({
      css: true,
      js: true
    })
  ]
});
```

**That's it!** The API is identical.

## 🎯 Benefits of Migration

### 1. Zero Dependencies
- ✅ Smaller package size
- ✅ Faster installation
- ✅ No dependency vulnerabilities
- ✅ No breaking changes from dependencies

### 2. More Flexible
- ✅ Use as Vite plugin
- ✅ Use as standalone function
- ✅ Works with any build tool

### 3. Better Logging
- ✅ Custom logger support
- ✅ Silent mode
- ✅ Better integration with existing tools

### 4. Better Documentation
- ✅ Full TypeScript types
- ✅ Comprehensive examples
- ✅ Multiple usage guides

## 🧪 Testing Migration

After migration, test that everything works:

```bash
# 1. Build your project
npm run build

# 2. Check dist/index.html
# Verify CSS, JS, and SVG are inlined

# 3. Test in browser
# Open dist/index.html and verify functionality
```

## 🆘 Need Help?

If you encounter issues during migration:

1. **Check the logs**: The new logger provides detailed output
2. **Compare options**: Ensure all options are correctly set
3. **Test locally**: Use `npm link` to test before publishing
4. **Open an issue**: [GitHub Issues](https://github.com/yourusername/vite-plugin-inline/issues)

## 📚 Additional Resources

- [README](README.md) - Full documentation
- [Quick Start](QUICK_START.md) - Get started quickly
- [Examples](examples/) - Usage examples
- [API Reference](src/index.d.ts) - TypeScript definitions

## ✅ Migration Checklist

- [ ] Update import paths
- [ ] Update logger usage (if applicable)
- [ ] Update color utilities (if applicable)
- [ ] Test build process
- [ ] Verify output HTML
- [ ] Test in browser
- [ ] Remove old files
- [ ] Uninstall chalk
- [ ] Update documentation
- [ ] Commit changes

## 🎉 You're Done!

Congratulations on migrating to the new version! Enjoy the benefits of zero dependencies and dual export mode.

If you find this useful, consider:
- ⭐ Starring the repository
- 📢 Sharing with others
- 🐛 Reporting issues
- 🤝 Contributing improvements

