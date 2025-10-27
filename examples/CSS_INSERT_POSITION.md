# CSS Insert Position Feature

## 🎯 Background

Previously, all inlined CSS was forced to the beginning of `<head>`, which caused:

1. ❌ Breaking original order
2. ❌ Ignoring developer intent
3. ❌ Potential issues from CSS/JS load order

### Original Behavior

```javascript
// 旧代码：强制插入到 <head> 最前面
html = html.replace('<head>', `<head>\n  <style>\n${inlinedStyles}  </style>`);
```

This resulted in:
```html
<!-- 原始 HTML -->
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="style.css">
  <script src="main.js"></script>
</head>

<!-- After (old version) -->
<head>
  <style>/* CSS */</style>  ← forced to top
  <meta charset="UTF-8">
  <script type="module">/* JS */</script>
</head>
```

## ✨ Solution

Add `cssInsertPosition` with three strategies:

### 1. `'original'` (default) - Keep original position ⭐

Inline CSS at each original `<link>` position

Pros:
- ✅ Preserves original order
- ✅ Respects developer intent
- ✅ CSS stays before JS if authored so

Cons:
- ⚠️ Multiple `<style>` tags for multiple CSS files

Example:
```html
<!-- 原始 HTML -->
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="style.css">
  <script src="main.js"></script>
</head>

<!-- After -->
<head>
  <meta charset="UTF-8">
  <style>/* CSS */</style>  ← kept in place
  <script type="module">/* JS */</script>
</head>
```

### 2. `'head-start'` - Move to beginning of `<head>`

Collect and insert all CSS at `<head>` start

Pros:
- ✅ Performance-optimized (CSS loads first)
- ✅ Single merged `<style>` tag

Cons:
- ⚠️ Changes original order

**示例：**
```html
<!-- 原始 HTML -->
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="style.css">
  <script src="main.js"></script>
</head>

<!-- 内联后 -->
<head>
  <style>/* 所有 CSS 合并 */</style>  ← 移到最前面
  <meta charset="UTF-8">
  <script type="module">/* JS */</script>
</head>
```

### 3. `'head-end'` - Move to end of `<head>`

**行为：** 收集所有 CSS，合并后插入到 `</head>` 标签之前

Pros:
- ✅ Single merged `<style>` tag
- ✅ Other head elements load first

Cons:
- ⚠️ CSS after JS (may affect rendering)

**示例：**
```html
<!-- 原始 HTML -->
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="style.css">
  <script src="main.js"></script>
</head>

<!-- 内联后 -->
<head>
  <meta charset="UTF-8">
  <script type="module">/* JS */</script>
  <style>/* 所有 CSS 合并 */</style>  ← 移到最后
</head>
```

## 🔧 Usage

### 作为 Vite 插件

```javascript
import inlineAssets from '@ropean/inline-assets';

export default defineConfig({
  plugins: [
    inlineAssets({
      cssInsertPosition: 'original'  // or 'head-start' or 'head-end'
    })
  ]
});
```

### Standalone Function

```javascript
import { inlineAssets } from '@ropean/inline-assets';

await inlineAssets({
  htmlPath: './dist/index.html',
  cssInsertPosition: 'original'  // or 'head-start' or 'head-end'
});
```

## 📊 Comparison Table

| Strategy | Preserves Order | Single `<style>` | CSS before JS | Best Performance | Use When |
|----------|------------------|------------------|---------------|------------------|----------|
| `original` | ✅ | ❌ | ✅ | ⚠️ | Preserve order |
| `head-start` | ❌ | ✅ | ✅ | ✅ | Performance |
| `head-end` | ❌ | ✅ | ❌ | ❌ | Special needs |

## 💡 Recommendations

### Use `'original'` (default)
- ✅ You care about load order
- ✅ CSS/JS have dependencies
- ✅ You authored CSS before JS
- ✅ Multiple `<style>` tags are acceptable

### Use `'head-start'`
- ✅ Performance first
- ✅ Minimize FOUC
- ✅ Single merged `<style>`
- ✅ Order not important

### Use `'head-end'`
- ✅ Special loading needs
- ✅ Meta/title should load first
- ✅ Single merged `<style>`

## 🎯 实现细节

### 策略 1: `'original'` - 就地替换

```javascript
html = html.replace(cssRegex, (match, cssFile) => {
  const cssContent = fs.readFileSync(cssPath, 'utf-8');
  return `<style>\n${cssContent}</style>`;  // 直接替换
});
```

### 策略 2/3: `'head-start'` / `'head-end'` - 收集并插入

```javascript
// 1. 收集所有 CSS
let inlinedStyles = '';
html = html.replace(cssRegex, (match, cssFile) => {
  inlinedStyles += fs.readFileSync(cssPath, 'utf-8') + '\n';
  return '';  // 移除原标签
});

// 2. 插入到指定位置
if (cssInsertPosition === 'head-start') {
  html = html.replace('<head>', `<head>\n  <style>\n${inlinedStyles}  </style>`);
} else if (cssInsertPosition === 'head-end') {
  html = html.replace('</head>', `  <style>\n${inlinedStyles}  </style>\n</head>`);
}
```

## 🔄 Backward Compatibility

- ✅ Default `'original'` keeps original placement
- ✅ If unspecified, behavior changes from "force to head start" to "keep original"
- ⚠️ If you depended on the old behavior, set `cssInsertPosition: 'head-start'`

## 📝 TypeScript 类型

```typescript
interface InlineAssetsOptions {
  // ... 其他选项
  
  /**
   * Where to insert inlined CSS
   * - 'original': Keep CSS at the original <link> tag position (preserves order)
   * - 'head-start': Move all CSS to the beginning of <head> (optimal performance)
   * - 'head-end': Move all CSS to the end of <head>
   * @default 'original'
   */
  cssInsertPosition?: 'original' | 'head-start' | 'head-end';
}
```

## 🧪 Testing Tips

测试不同策略的效果：

```javascript
// Test 1: Ensure 'original' preserves order
const html1 = await inlineAssets({
  htmlPath: './index.html',
  cssInsertPosition: 'original'
});
// Verify CSS is kept in place

// Test 2: Ensure 'head-start' moves to the beginning
const html2 = await inlineAssets({
  htmlPath: './index.html',
  cssInsertPosition: 'head-start'
});
// Verify CSS is inserted at the start of <head>

// Test 3: Ensure 'head-end' moves to the end
const html3 = await inlineAssets({
  htmlPath: './index.html',
  cssInsertPosition: 'head-end'
});
// Verify CSS is inserted before </head>
```

## 🎉 Summary

This feature addresses the main issues in the original approach:

1. ✅ Preserves order by default
2. ✅ Flexible strategies for different needs
3. ✅ Backward compatible sensible default
4. ✅ Clear documentation of tradeoffs

Choose the approach that fits your scenario best! 🚀

