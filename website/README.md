# @ropean/inline-assets Website V2

全新设计的现代化网站，使用 **Tailwind CSS** 构建。

## ✨ 特性

- 🎨 **Tailwind CSS** - 现代化的实用优先 CSS 框架
- 🌓 **暗色模式** - 完整的暗色主题支持
- 📱 **响应式设计** - 完美适配所有设备
- ⚡ **性能优化** - 代码分割、懒加载、优化构建
- 🎭 **流畅动画** - 使用 Tailwind 动画和过渡
- 🎯 **零依赖** - 只使用 Vue 3，无其他运行时依赖

## 🚀 快速开始

### 开发

```bash
# 从根目录运行
pnpm dev:v2

# 或直接在 website-v2 目录
cd website-v2
pnpm dev
```

访问 `http://localhost:5173/`

### 构建

```bash
# 从根目录运行
pnpm build:v2

# 或直接在 website-v2 目录
cd website-v2
pnpm build
```

构建输出到 `../dist-website-v2/`

### 预览

```bash
pnpm preview:v2
```

## 📁 项目结构

```
website-v2/
├── public/              # 静态资源
│   ├── favicon.svg
│   └── logo.svg
├── src/
│   ├── App.vue         # 主应用组件（单文件应用）
│   ├── main.js         # 入口文件
│   └── style.css       # Tailwind CSS 配置
├── index.html          # HTML 模板
├── package.json        # 依赖配置
├── postcss.config.js   # PostCSS 配置
├── tailwind.config.js  # Tailwind 配置
└── vite.config.js      # Vite 配置
```

## 🎨 设计特点

### 单文件应用
整个网站在一个 `App.vue` 文件中，简洁高效：
- Hero Section - 英雄区，渐变背景 + 动画
- Features Section - 6个特性卡片，悬浮效果
- Playground Section - 交互式演示区（待实现）
- Quick Start Section - 快速开始代码示例
- Footer - 页脚信息

### 配色方案
- **主色**: Purple/Blue 渐变 (#667eea → #764ba2)
- **暗色模式**: Slate 系列
- **强调色**: 渐变按钮和卡片

### 动画效果
- `animate-slide-up` - 上滑进入
- `animate-slide-down` - 下滑进入
- `animate-scale-in` - 缩放进入
- `animate-float` - 浮动效果
- `animate-bounce` - 弹跳效果

## 🔧 技术栈

- **Vue 3** - 渐进式 JavaScript 框架
- **Vite** - 下一代前端构建工具
- **Tailwind CSS** - 实用优先的 CSS 框架
- **PostCSS** - CSS 转换工具
- **Autoprefixer** - 自动添加浏览器前缀

## 📦 依赖

### 生产依赖
- `vue` - Vue 3 框架

### 开发依赖
- `@vitejs/plugin-vue` - Vite 的 Vue 插件
- `tailwindcss` - Tailwind CSS 框架
- `postcss` - CSS 处理器
- `autoprefixer` - 自动前缀
- `vite` - 构建工具

## 🎯 与旧版对比

| 特性 | 旧版 (website) | 新版 (website-v2) |
|------|---------------|------------------|
| CSS 框架 | 手写 CSS | Tailwind CSS |
| 文件数量 | 多个组件 | 单文件应用 |
| 依赖数量 | 4 | 1 (运行时) |
| 暗色模式 | 手动实现 | Tailwind 内置 |
| 响应式 | 手写媒体查询 | Tailwind 响应式类 |
| 动画 | 手写 CSS | Tailwind 动画类 |
| 维护性 | 中等 | 极高 |

## 🚧 待实现

- [ ] 交互式 Playground
- [ ] 代码语法高亮
- [ ] 更多示例
- [ ] 移动端菜单
- [ ] 页面滚动动画
- [ ] 性能指标展示

## 📝 自定义

### 修改配色
编辑 `tailwind.config.js` 中的 `colors` 配置

### 添加动画
在 `tailwind.config.js` 中的 `animation` 和 `keyframes` 添加新动画

### 修改内容
直接编辑 `src/App.vue` 文件

## 🌐 部署

构建后的文件可以部署到任何静态托管服务：
- GitHub Pages
- Vercel
- Netlify
- Cloudflare Pages

## 📄 许可证

MIT © 2025 ropean

