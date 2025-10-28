## 🎨 网站设计方案

### 核心理念
> **"用自己的工具打包的单文件网站" - 展示工具的最佳实践**

---

## 📐 网站结构

### 首页 (Hero Page)

```
┌─────────────────────────────────────────┐
│  🎯 Hero Section                        │
│  - 大标题动画                            │
│  - 核心卖点（零依赖、双模式、通用）      │
│  - CTA 按钮（开始使用、查看 Demo）       │
│  - 代码示例预览                          │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  ✨ Features 特性展示                   │
│  - 6 大特性卡片（动画进入）              │
│  - 图标 + 标题 + 描述                   │
│  - 悬停效果                              │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  💡 Live Demo 在线演示                  │
│  - 左侧：输入 HTML/CSS/JS               │
│  - 右侧：实时预览内联结果                │
│  - 显示文件大小对比                      │
│  - 下载按钮                              │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  📊 Comparison 对比表格                 │
│  - vs 手动内联                           │
│  - vs 其他工具                           │
│  - 显示优势                              │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  🚀 Quick Start 快速开始                │
│  - Tab 切换（Vite / Webpack / 独立）    │
│  - 代码高亮                              │
│  - 复制按钮                              │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  📚 Use Cases 使用场景                  │
│  - 邮件模板                              │
│  - 离线应用                              │
│  - Chrome 扩展                           │
│  - 文档网站                              │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│  📈 Stats 统计数据                      │
│  - npm 下载量（动态）                    │
│  - GitHub Stars                          │
│  - 版本信息                              │
└─────────────────────────────────────────┘
```

---

## 🎯 核心功能

### 1. 在线演示（最重要！）⭐⭐⭐⭐⭐

```vue
<template>
  <div class="playground">
    <div class="editor-panel">
      <h3>输入你的 HTML</h3>
      <CodeEditor v-model="html" language="html" />
      
      <h3>CSS 文件</h3>
      <CodeEditor v-model="css" language="css" />
      
      <h3>JS 文件</h3>
      <CodeEditor v-model="js" language="javascript" />
      
      <button @click="inline">🚀 内联资源</button>
    </div>
    
    <div class="preview-panel">
      <h3>内联后的结果</h3>
      <CodeEditor :value="result" language="html" readonly />
      
      <div class="stats">
        <div>原始大小: {{ originalSize }} KB</div>
        <div>内联后: {{ inlinedSize }} KB</div>
        <div>减少请求: {{ requests }} 个</div>
      </div>
      
      <button @click="download">⬇️ 下载</button>
      <button @click="preview">👁️ 预览</button>
    </div>
  </div>
</template>
```

**功能点：**
- ✅ 实时编辑 HTML/CSS/JS
- ✅ 点击按钮执行内联（纯前端实现）
- ✅ 显示文件大小对比
- ✅ 下载内联后的 HTML
- ✅ 在新窗口预览结果
- ✅ 显示减少的 HTTP 请求数

---

### 2. 交互式文档

```vue
<template>
  <div class="docs">
    <!-- 侧边栏导航 -->
    <aside class="sidebar">
      <nav>
        <a href="#install">安装</a>
        <a href="#usage">使用</a>
        <a href="#options">配置选项</a>
        <a href="#api">API 文档</a>
        <a href="#examples">示例</a>
        <a href="#faq">FAQ</a>
      </nav>
    </aside>
    
    <!-- 主内容 -->
    <main class="content">
      <section id="install">
        <h2>安装</h2>
        <CodeBlock :code="installCode" copyable />
      </section>
      
      <section id="usage">
        <h2>使用</h2>
        <Tabs>
          <Tab title="Vite Plugin">
            <CodeBlock :code="viteCode" copyable />
          </Tab>
          <Tab title="Standalone">
            <CodeBlock :code="standaloneCode" copyable />
          </Tab>
          <Tab title="Webpack">
            <CodeBlock :code="webpackCode" copyable />
          </Tab>
        </Tabs>
      </section>
    </main>
  </div>
</template>
```

**功能点：**
- ✅ 锚点导航
- ✅ 代码高亮
- ✅ 一键复制
- ✅ Tab 切换不同示例
- ✅ 搜索功能（Algolia DocSearch）

---

### 3. 真实示例展示

```vue
<template>
  <div class="examples">
    <div class="example-card">
      <h3>Vite 项目</h3>
      <CodeBlock :code="viteExample" />
      <button @click="tryInPlayground(viteExample)">
        在 Playground 中尝试
      </button>
    </div>
    
    <div class="example-card">
      <h3>Webpack 项目</h3>
      <CodeBlock :code="webpackExample" />
      <button @click="tryInPlayground(webpackExample)">
        在 Playground 中尝试
      </button>
    </div>
  </div>
</template>
```

**功能点：**
- ✅ 从 `examples/` 目录自动导入真实示例
- ✅ 点击可跳转到 Playground 测试
- ✅ 显示每个示例的说明

---

### 4. 配置生成器（可选但很酷）⭐

```vue
<template>
  <div class="config-generator">
    <h2>配置生成器</h2>
    
    <div class="options">
      <label>
        <input type="checkbox" v-model="config.css" />
        内联 CSS
      </label>
      
      <label>
        <input type="checkbox" v-model="config.js" />
        内联 JavaScript
      </label>
      
      <label>
        <input type="checkbox" v-model="config.svg.img" />
        内联 SVG (img)
      </label>
      
      <label>
        <input type="checkbox" v-model="config.svg.link" />
        内联 SVG (link)
      </label>
      
      <label>
        CSS 插入位置:
        <select v-model="config.cssInsertPosition">
          <option value="original">原始位置</option>
          <option value="head-start">Head 开头</option>
          <option value="head-end">Head 末尾</option>
        </select>
      </label>
      
      <label>
        排除文件:
        <input v-model="config.excludes" placeholder="vendor.js, analytics.js" />
      </label>
    </div>
    
    <div class="generated-config">
      <h3>生成的配置</h3>
      <CodeBlock :code="generatedCode" language="javascript" copyable />
    </div>
  </div>
</template>
```

**功能点：**
- ✅ 可视化配置选项
- ✅ 实时生成配置代码
- ✅ 一键复制配置

---

### 5. 性能对比可视化

```vue
<template>
  <div class="comparison">
    <h2>性能对比</h2>
    
    <div class="chart">
      <BarChart :data="comparisonData" />
    </div>
    
    <table class="comparison-table">
      <thead>
        <tr>
          <th></th>
          <th>传统方式</th>
          <th>使用 @ropean/inline-assets</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>HTTP 请求</td>
          <td class="bad">10 个</td>
          <td class="good">1 个 ✓</td>
        </tr>
        <tr>
          <td>首次加载</td>
          <td class="bad">2.5s</td>
          <td class="good">0.8s ✓</td>
        </tr>
        <tr>
          <td>文件数量</td>
          <td class="bad">10 个</td>
          <td class="good">1 个 ✓</td>
        </tr>
        <tr>
          <td>缓存策略</td>
          <td class="good">可缓存 ✓</td>
          <td class="neutral">单文件</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
```

---

### 6. 使用场景展示

```vue
<template>
  <div class="use-cases">
    <div class="use-case-card">
      <div class="icon">📧</div>
      <h3>邮件模板</h3>
      <p>将样式内联到 HTML，确保邮件客户端正确显示</p>
      <a href="#email-example">查看示例 →</a>
    </div>
    
    <div class="use-case-card">
      <div class="icon">📱</div>
      <h3>离线应用</h3>
      <p>打包成单文件，支持完全离线使用</p>
      <a href="#offline-example">查看示例 →</a>
    </div>
    
    <div class="use-case-card">
      <div class="icon">🧩</div>
      <h3>Chrome 扩展</h3>
      <p>减少文件数量，简化扩展打包</p>
      <a href="#extension-example">查看示例 →</a>
    </div>
    
    <div class="use-case-card">
      <div class="icon">📄</div>
      <h3>文档站点</h3>
      <p>快速加载，无需额外请求</p>
      <a href="#docs-example">查看示例 →</a>
    </div>
  </div>
</template>
```

---

## 🎨 设计风格建议

### 配色方案
```css
:root {
  /* 主色调 - 紫色渐变（科技感） */
  --primary: #667eea;
  --primary-dark: #764ba2;
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  
  /* 辅助色 */
  --success: #00dc82;
  --warning: #ff9a00;
  --info: #3498db;
  --danger: #ff4d4f;
  
  /* 背景色 */
  --bg-primary: #ffffff;
  --bg-secondary: #f8f9fa;
  --bg-dark: #1a1a2e;
  
  /* 文字色 */
  --text-primary: #2c3e50;
  --text-secondary: #6c757d;
  --text-light: #ffffff;
}
```

### 动画效果
- ✅ 页面进入淡入动画
- ✅ 卡片悬停放大效果
- ✅ 代码块打字机效果
- ✅ 数字滚动动画
- ✅ Logo 浮动动画
- ✅ 按钮波纹效果

---

## 📱 响应式设计

```
桌面端 (> 1024px)
├── 侧边栏导航
├── 双栏布局（编辑器 + 预览）
└── 完整功能

平板端 (768px - 1024px)
├── 汉堡菜单
├── 单栏布局（可切换）
└── 完整功能

移动端 (< 768px)
├── 汉堡菜单
├── 单栏布局
└── 简化功能（只显示预览）
```

---

## 🚀 技术栈建议

```javascript
{
  "核心": "Vite + Vue 3",
  "UI框架": "不用，自己写（展示 CSS 能力）",
  "代码编辑器": "CodeMirror 6 或 Monaco Editor",
  "代码高亮": "Shiki",
  "动画": "CSS + GSAP（可选）",
  "图表": "Chart.js（可选）",
  "构建": "@ropean/inline-assets（自己的工具！）",
  "部署": "GitHub Pages"
}
```

---

## 📦 项目结构

```
website/
├── index.html
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── router/
│   │   └── index.js
│   ├── views/
│   │   ├── Home.vue           # 首页
│   │   ├── Playground.vue     # 在线演示
│   │   ├── Docs.vue           # 文档
│   │   ├── Examples.vue       # 示例
│   │   └── About.vue          # 关于
│   ├── components/
│   │   ├── Hero.vue           # Hero 区域
│   │   ├── Features.vue       # 特性卡片
│   │   ├── CodeBlock.vue      # 代码块
│   │   ├── CodeEditor.vue     # 代码编辑器
│   │   ├── Navbar.vue         # 导航栏
│   │   └── Footer.vue         # 页脚
│   ├── composables/
│   │   ├── useInline.js       # 内联逻辑
│   │   └── useStats.js        # 统计数据
│   └── styles/
│       ├── main.css
│       └── animations.css
├── public/
│   ├── favicon.svg
│   └── og-image.png
└── vite.config.js
```

---

## 🎯 MVP 功能优先级

### 第一阶段（必须有）⭐⭐⭐⭐⭐
1. ✅ 首页 + Hero Section
2. ✅ 特性展示
3. ✅ 快速开始（代码示例）
4. ✅ 基础文档
5. ✅ GitHub/npm 链接

### 第二阶段（很重要）⭐⭐⭐⭐
6. ✅ 在线 Playground
7. ✅ 真实示例展示
8. ✅ 配置生成器
9. ✅ 使用场景展示

### 第三阶段（锦上添花）⭐⭐⭐
10. ✅ 性能对比图表
11. ✅ 搜索功能
12. ✅ 评论系统
13. ✅ 下载统计

---

## 💡 创新点

### 1. "实时演示"按钮
在文档的每个代码块旁边加一个按钮，点击直接在 Playground 中打开

### 2. "配置向导"
像安装向导一样，一步步引导用户配置

### 3. "对比模式"
左边显示内联前，右边显示内联后，实时对比

### 4. "性能得分"
给用户的配置打分（如：你的配置可以减少 X% 的加载时间）

---

## 🎉 彩蛋功能

1. **Konami Code** - 输入特殊按键显示隐藏动画
2. **暗黑模式** - 一键切换深色主题
3. **控制台 ASCII Art** - 打开控制台有惊喜
4. **下载统计实时显示** - 从 npm API 获取下载量

---

## 📊 我的最终建议

**核心功能（必须有）：**
1. ✅ 漂亮的首页
2. ✅ 在线 Playground（最重要！）
3. ✅ 完整的文档
4. ✅ 真实示例

**可选但很酷：**
5. ✅ 配置生成器
6. ✅ 性能对比
7. ✅ 使用场景展示

**技术选择：**
- Vite + Vue 3（轻量、快速）
- 自己写 CSS（展示能力）
- 用自己的工具打包（完美 Demo）

---

**需要我开始创建吗？** 我可以：
1. 创建完整的 `website/` 目录结构
2. 实现基础页面和组件
3. 实现在线 Playground
4. 配置自动部署

你觉得这个方案怎么样？有什么想法或需要调整的吗？😊