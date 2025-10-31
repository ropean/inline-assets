# @ropean/inline-assets

[![Deploy Website](https://github.com/ropean/inline-assets/actions/workflows/deploy-website-cloudflare.yml/badge.svg)](https://github.com/ropean/inline-assets/actions/workflows/deploy-website-cloudflare.yml)
[![Live Site](https://img.shields.io/badge/live-inline-assets.ropean.org-purple)](https://inline-assets.ropean.org)
[![license](https://img.shields.io/npm/l/@ropean/inline-assets.svg)](https://github.com/ropean/inline-assets/blob/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/@ropean/inline-assets.svg)](https://www.npmjs.com/package/@ropean/inline-assets)
[![downloads](https://img.shields.io/npm/dm/@ropean/inline-assets.svg)](https://www.npmjs.com/package/@ropean/inline-assets)

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
npm install @ropean/inline-assets -D
```

```bash
yarn add @ropean/inline-assets -D
```

```bash
pnpm add @ropean/inline-assets -D
```

## 🚀 Usage

### As a Vite Plugin

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import inlineAssets from '@ropean/inline-assets';

export default defineConfig({
  plugins: [
    inlineAssets({
      css: true,
      js: true,
      svg: { img: false, link: true },
      excludes: ['assets/large-file.js'],
    }),
  ],
});
```

### As a Standalone Function

Perfect for use with **any build tool** (Webpack, Rollup, esbuild, etc.):

```javascript
import { inlineAssets } from '@ropean/inline-assets';

// After your build process
await inlineAssets({
  htmlPath: './dist/index.html',
  css: true,
  js: true,
  svg: { img: true, link: true },
});
```

### With Custom Logger

```javascript
import { inlineAssets } from '@ropean/inline-assets';

const myLogger = {
  info: (msg) => console.log('[INFO]', msg),
  success: (msg) => console.log('[✓]', msg),
  warning: (msg) => console.warn('[⚠]', msg),
  error: (msg) => console.error('[✖]', msg),
};

await inlineAssets({
  htmlPath: './dist/index.html',
  logger: myLogger,
});

// Or disable logging completely
await inlineAssets({
  htmlPath: './dist/index.html',
  logger: false,
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
  svg?:
    | boolean
    | {
        img?: boolean; // Inline SVG in <img> tags
        link?: boolean; // Inline SVG in <link> tags (favicon)
      };

  /** File patterns to exclude from inlining (default: []) */
  excludes?: string[];

  /** Distribution directory name (default: 'dist') */
  distDir?: string;

  /** HTML file name to process (default: 'index.html') */
  htmlFileName?: string;

  /** Where to insert inlined CSS (default: 'original') */
  cssInsertPosition?: 'original' | 'head-start' | 'head-end';

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
  svg?:
    | boolean
    | {
        img?: boolean;
        link?: boolean;
      };

  /** File patterns to exclude from inlining (default: []) */
  excludes?: string[];

  /** Whether to delete inlined asset files (default: true) */
  removeInlinedFiles?: boolean;

  /** Whether to remove empty directories (default: true) */
  cleanupEmptyDirs?: boolean;

  /** Where to insert inlined CSS (default: 'original') */
  cssInsertPosition?: 'original' | 'head-start' | 'head-end';

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
  event?(message: string): void; // Optional
  file?(path: string): string; // Optional
  newline?(count?: number): void; // Optional
}
```

## 🎯 CSS Insert Position

Control where inlined CSS is placed in your HTML:

```javascript
inlineAssets({
  cssInsertPosition: 'original', // Default: keep CSS at original <link> position
});
```

### Available Options:

- **`'original'`** (default) - Keeps CSS at the original `<link>` tag position

  - ✅ Preserves the order of CSS and JS
  - ✅ CSS appears before JS if that's how you structured it
  - ⚠️ May create multiple `<style>` tags if you have multiple CSS files

- **`'head-start'`** - Moves all CSS to the beginning of `<head>`

  - ✅ Optimal for performance (CSS loads first)
  - ✅ Single merged `<style>` tag
  - ⚠️ Changes the original order

- **`'head-end'`** - Moves all CSS to the end of `<head>`
  - ✅ Single merged `<style>` tag
  - ⚠️ CSS loads after other head elements

### Example:

```javascript
// Keep CSS before JS (preserves order)
inlineAssets({
  cssInsertPosition: 'original',
});

// Optimize for performance (CSS at top)
inlineAssets({
  cssInsertPosition: 'head-start',
});
```

## 🎯 Exclusion Patterns

Exclude specific files from inlining:

```javascript
inlineAssets({
  excludes: [
    'index.js', // Matches any file named 'index.js'
    'assets/vendor.js', // Matches 'assets/vendor.js' specifically
    'large-image.svg', // Matches any file named 'large-image.svg'
  ],
});
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

See the [`examples/`](examples/) directory for complete, runnable examples:

- 📘 **[Vite Plugin Usage](examples/vite-usage.js)** - Basic and advanced Vite plugin configurations
- 🔧 **[Standalone Function](examples/standalone-usage.js)** - Use with any build tool
- 📦 **[Webpack Integration](examples/webpack-integration.js)** - Webpack plugin example
- 🎯 **[Rollup Integration](examples/rollup-integration.js)** - Rollup plugin example
- 🌊 **[Gulp Integration](examples/gulp-integration.js)** - Gulp task example
- 📜 **[npm Scripts](examples/npm-script.js)** - Post-build script with error handling
- 🎨 **[CSS Insert Position](examples/css-insert-position.js)** - CSS positioning strategies

### Quick Start Examples

<details>
<summary><b>Webpack Integration</b></summary>

```javascript
// webpack.config.js
const { inlineAssets } = require('@ropean/inline-assets');

module.exports = {
  plugins: [
    {
      apply: (compiler) => {
        compiler.hooks.done.tap('InlineAssets', async () => {
          await inlineAssets({ htmlPath: './dist/index.html' });
        });
      },
    },
  ],
};
```

👉 [View full example](examples/webpack-integration.js)

</details>

<details>
<summary><b>Rollup Integration</b></summary>

```javascript
// rollup.config.js
import { inlineAssets } from '@ropean/inline-assets';

export default {
  plugins: [
    {
      name: 'inline-assets',
      closeBundle: async () => {
        await inlineAssets({ htmlPath: './dist/index.html' });
      },
    },
  ],
};
```

👉 [View full example](examples/rollup-integration.js)

</details>

<details>
<summary><b>npm Scripts</b></summary>

```json
{
  "scripts": {
    "build": "vite build",
    "postbuild": "node inline-assets.js"
  }
}
```

```javascript
// inline-assets.js
import { inlineAssets } from '@ropean/inline-assets';

const result = await inlineAssets({
  htmlPath: './dist/index.html',
});

if (!result.success) {
  console.error('Failed to inline assets');
  process.exit(1);
}
```

👉 [View full example with error handling](examples/npm-script.js)

</details>

<details>
<summary><b>Gulp Integration</b></summary>

```javascript
// gulpfile.js
import { inlineAssets } from '@ropean/inline-assets';
import gulp from 'gulp';

gulp.task('inline', async () => {
  await inlineAssets({ htmlPath: './dist/index.html' });
});

gulp.task('build', gulp.series('your-build-task', 'inline'));
```

👉 [View full example with error handling](examples/gulp-integration.js)

</details>

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

Found a bug or have a feature request? [Open an issue](https://github.com/ropean/inline-assets/issues)
