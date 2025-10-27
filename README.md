# vite-plugin-inline

[![npm version](https://img.shields.io/npm/v/vite-plugin-inline.svg)](https://www.npmjs.com/package/vite-plugin-inline)
[![license](https://img.shields.io/npm/l/vite-plugin-inline.svg)](https://github.com/yourusername/vite-plugin-inline/blob/main/LICENSE)

A **zero-dependency** Vite plugin and standalone utility to inline CSS, JavaScript, and SVG assets into HTML for single-file deployment.

## ✨ Features

- 🚀 **Zero Dependencies** - No external packages required
- 🔌 **Dual Mode** - Use as Vite plugin or standalone function
- 🎨 **Inline CSS** - Converts `<link>` tags to `<style>` tags
- 📦 **Inline JavaScript** - Converts `<script src>` to inline `<script>`
- 🖼️ **Inline SVG** - Converts SVG files to base64 data URIs
- 🎯 **Selective Inlining** - Exclude specific files with patterns
- 🧹 **Auto Cleanup** - Removes inlined files and empty directories
- 📝 **Custom Logger** - Bring your own logger or use the built-in one
- 🔧 **TypeScript Support** - Full type definitions included

## 📦 Installation

```bash
npm install vite-plugin-inline --save-dev
```

```bash
yarn add vite-plugin-inline -D
```

```bash
pnpm add vite-plugin-inline -D
```

## 🚀 Usage

### As a Vite Plugin

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import viteInlineAssets from 'vite-plugin-inline';

export default defineConfig({
  plugins: [
    viteInlineAssets({
      css: true,
      js: true,
      svg: { img: false, link: true },
      excludes: ['assets/large-file.js']
    })
  ]
});
```

### As a Standalone Function

Perfect for use with **any build tool** (Webpack, Rollup, esbuild, etc.):

```javascript
import { inlineAssets } from 'vite-plugin-inline';

// After your build process
await inlineAssets({
  htmlPath: './dist/index.html',
  css: true,
  js: true,
  svg: { img: true, link: true }
});
```

### With Custom Logger

```javascript
import { inlineAssets } from 'vite-plugin-inline';

const myLogger = {
  info: (msg) => console.log('[INFO]', msg),
  success: (msg) => console.log('[✓]', msg),
  warning: (msg) => console.warn('[⚠]', msg),
  error: (msg) => console.error('[✖]', msg),
};

await inlineAssets({
  htmlPath: './dist/index.html',
  logger: myLogger
});

// Or disable logging completely
await inlineAssets({
  htmlPath: './dist/index.html',
  logger: false
});
```

## ⚙️ Options

### Vite Plugin Options

```typescript
interface VitePluginOptions {
  /** Whether to inline CSS files (default: true) */
  css?: boolean;
  
  /** Whether to inline JavaScript files (default: true) */
  js?: boolean;
  
  /** SVG inlining options (default: { img: false, link: true }) */
  svg?: boolean | {
    img?: boolean;  // Inline SVG in <img> tags
    link?: boolean; // Inline SVG in <link> tags (favicon)
  };
  
  /** File patterns to exclude from inlining (default: []) */
  excludes?: string[];
  
  /** Distribution directory name (default: 'dist') */
  distDir?: string;
  
  /** HTML file name to process (default: 'index.html') */
  htmlFileName?: string;
  
  /** Custom logger or false to disable (default: built-in logger) */
  logger?: LoggerInterface | false;
}
```

### Standalone Function Options

```typescript
interface InlineAssetsOptions {
  /** Path to the HTML file to process (required) */
  htmlPath: string;
  
  /** Base directory for resolving asset paths (default: HTML file's directory) */
  baseDir?: string;
  
  /** Whether to inline CSS files (default: true) */
  css?: boolean;
  
  /** Whether to inline JavaScript files (default: true) */
  js?: boolean;
  
  /** SVG inlining options (default: true) */
  svg?: boolean | {
    img?: boolean;
    link?: boolean;
  };
  
  /** File patterns to exclude from inlining (default: []) */
  excludes?: string[];
  
  /** Whether to delete inlined asset files (default: true) */
  removeInlinedFiles?: boolean;
  
  /** Whether to remove empty directories (default: true) */
  cleanupEmptyDirs?: boolean;
  
  /** Custom logger or false to disable (default: built-in logger) */
  logger?: LoggerInterface | false;
}
```

## 📝 Custom Logger Interface

Implement this interface to create your own logger:

```typescript
interface LoggerInterface {
  info(message: string): void;
  success(message: string): void;
  warning(message: string): void;
  error(message: string): void;
  event?(message: string): void;      // Optional
  file?(path: string): string;        // Optional
  newline?(count?: number): void;     // Optional
}
```

## 🎯 Exclusion Patterns

Exclude specific files from inlining:

```javascript
viteInlineAssets({
  excludes: [
    'index.js',           // Matches any file named 'index.js'
    'assets/vendor.js',   // Matches 'assets/vendor.js' specifically
    'large-image.svg'     // Matches any file named 'large-image.svg'
  ]
})
```

## 🔧 How It Works

### Vite Plugin Mode

1. **Config Hook**: Automatically configures Vite to extract CSS as a single file
2. **Build**: Vite builds your project normally
3. **Close Bundle Hook**: After build completes, inlines assets into HTML
4. **Cleanup**: Removes inlined files and empty directories

### Standalone Mode

1. Reads the HTML file
2. Finds all CSS, JS, and SVG references
3. Inlines their content (CSS/JS as text, SVG as base64)
4. Writes the modified HTML back
5. Optionally removes inlined files

## 📊 Example Output

**Before** (3 files):
```
dist/
├── index.html
├── assets/
│   ├── index.css
│   └── index.js
```

**After** (1 file):
```
dist/
└── index.html  (with inlined CSS and JS)
```

## 🤝 Integration Examples

### With Webpack

```javascript
// webpack.config.js
const { inlineAssets } = require('vite-plugin-inline');

module.exports = {
  // ... your webpack config
  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.done.tap('InlineAssets', async () => {
          await inlineAssets({
            htmlPath: './dist/index.html'
          });
        });
      }
    }
  ]
};
```

### With Rollup

```javascript
// rollup.config.js
import { inlineAssets } from 'vite-plugin-inline';

export default {
  // ... your rollup config
  plugins: [
    {
      name: 'inline-assets',
      closeBundle: async () => {
        await inlineAssets({
          htmlPath: './dist/index.html'
        });
      }
    }
  ]
};
```

### With npm Scripts

```json
{
  "scripts": {
    "build": "vite build",
    "postbuild": "node inline.js"
  }
}
```

```javascript
// inline.js
import { inlineAssets } from 'vite-plugin-inline';

await inlineAssets({
  htmlPath: './dist/index.html'
});
```

## 🐛 Troubleshooting

### CSS not inlining properly?

Make sure you're not using `cssCodeSplit: true` in your Vite config. The plugin automatically sets this to `false`.

### Assets not found?

Check that `baseDir` points to the correct directory where your assets are located.

### Want to keep some files external?

Use the `excludes` option to prevent specific files from being inlined.

## 📄 License

MIT © ropean

## 🙏 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📮 Issues

Found a bug or have a feature request? [Open an issue](https://github.com/yourusername/vite-plugin-inline/issues)

