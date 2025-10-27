# CSS Insert Position Feature

## 🎯 问题背景

在原始实现中，所有内联的 CSS 都会被**强制移动到 `<head>` 标签的最前面**，这导致：

1. ❌ **破坏了原始顺序** - 即使你在 HTML 中把 `<link>` 放在 `<script>` 前面，内联后 CSS 也会被移到最前面
2. ❌ **不尊重开发者意图** - 开发者精心安排的资源加载顺序被改变
3. ❌ **可能导致问题** - 某些情况下，CSS 和 JS 的加载顺序很重要

### 原始代码问题

```javascript
// 旧代码：强制插入到 <head> 最前面
html = html.replace('<head>', `<head>\n  <style>\n${inlinedStyles}  </style>`);
```

这会导致：
```html
<!-- 原始 HTML -->
<head>
  <meta charset="UTF-8">
  <link rel="stylesheet" href="style.css">
  <script src="main.js"></script>
</head>

<!-- 内联后（旧版本）-->
<head>
  <style>/* CSS */</style>  ← 被强制移到最前面！
  <meta charset="UTF-8">
  <script type="module">/* JS */</script>
</head>
```

## ✨ 解决方案

添加了 `cssInsertPosition` 选项，支持三种插入策略：

### 1. `'original'` (默认) - 保留原始位置 ⭐

**行为：** 将 CSS 内联到原始 `<link>` 标签的位置

**优点：**
- ✅ 保留原始顺序
- ✅ 尊重开发者意图
- ✅ CSS 在 JS 前面（如果你这样写的话）
- ✅ 符合直觉

**缺点：**
- ⚠️ 多个 CSS 文件会产生多个 `<style>` 标签

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
  <style>/* CSS */</style>  ← 保持在原位置
  <script type="module">/* JS */</script>
</head>
```

### 2. `'head-start'` - 移到 `<head>` 开头

**行为：** 收集所有 CSS，合并后插入到 `<head>` 标签之后

**优点：**
- ✅ 性能最优（CSS 最先加载）
- ✅ 单个合并的 `<style>` 标签
- ✅ 符合性能最佳实践

**缺点：**
- ⚠️ 改变了原始顺序

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

### 3. `'head-end'` - 移到 `<head>` 末尾

**行为：** 收集所有 CSS，合并后插入到 `</head>` 标签之前

**优点：**
- ✅ 单个合并的 `<style>` 标签
- ✅ 其他 head 元素先加载

**缺点：**
- ⚠️ CSS 在 JS 之后（可能影响渲染）

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

## 🔧 使用方法

### 作为 Vite 插件

```javascript
import viteInlineAssets from 'vite-plugin-inline';

export default defineConfig({
  plugins: [
    viteInlineAssets({
      cssInsertPosition: 'original'  // 或 'head-start' 或 'head-end'
    })
  ]
});
```

### 作为独立函数

```javascript
import { inlineAssets } from 'vite-plugin-inline';

await inlineAssets({
  htmlPath: './dist/index.html',
  cssInsertPosition: 'original'  // 或 'head-start' 或 'head-end'
});
```

## 📊 对比表格

| 策略 | 保留顺序 | 单个 `<style>` | CSS 在 JS 前 | 性能最优 | 推荐场景 |
|------|---------|---------------|-------------|---------|---------|
| `original` | ✅ | ❌ | ✅ (如果你这样写) | ⚠️ | 需要保留顺序 |
| `head-start` | ❌ | ✅ | ✅ | ✅ | 性能优先 |
| `head-end` | ❌ | ✅ | ❌ | ❌ | 特殊需求 |

## 💡 推荐使用场景

### 使用 `'original'` (默认)
- ✅ 你关心资源加载顺序
- ✅ 你的 CSS 和 JS 有依赖关系
- ✅ 你希望 CSS 在 JS 前面（如你在 HTML 中写的那样）
- ✅ 你不在意多个 `<style>` 标签

### 使用 `'head-start'`
- ✅ 性能是首要考虑
- ✅ 你希望 CSS 尽快加载（减少 FOUC）
- ✅ 你希望单个合并的 `<style>` 标签
- ✅ 你不关心原始顺序

### 使用 `'head-end'`
- ✅ 你有特殊的加载需求
- ✅ 你希望 meta 标签和 title 先加载
- ✅ 你希望单个合并的 `<style>` 标签

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

## 🔄 向后兼容性

- ✅ **默认值是 `'original'`** - 保留原始位置，最符合直觉
- ✅ **如果不指定，行为改变** - 从"强制移到最前面"变为"保留原位置"
- ⚠️ **轻微的破坏性变化** - 如果用户依赖旧的"移到最前面"行为，需要显式设置 `cssInsertPosition: 'head-start'`

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

## 🧪 测试建议

测试不同策略的效果：

```javascript
// 测试 1: 验证 'original' 保留顺序
const html1 = await inlineAssets({
  htmlPath: './index.html',
  cssInsertPosition: 'original'
});
// 验证 CSS 在原位置

// 测试 2: 验证 'head-start' 移到最前
const html2 = await inlineAssets({
  htmlPath: './index.html',
  cssInsertPosition: 'head-start'
});
// 验证 CSS 在 <head> 之后第一个位置

// 测试 3: 验证 'head-end' 移到最后
const html3 = await inlineAssets({
  htmlPath: './index.html',
  cssInsertPosition: 'head-end'
});
// 验证 CSS 在 </head> 之前
```

## 🎉 总结

这个功能解决了原始实现的主要问题：

1. ✅ **默认保留顺序** - 尊重开发者意图
2. ✅ **灵活可配置** - 三种策略满足不同需求
3. ✅ **向后兼容** - 默认行为更合理
4. ✅ **文档完善** - 清晰说明每种策略的优缺点

现在用户可以根据自己的需求选择最合适的策略！🚀

