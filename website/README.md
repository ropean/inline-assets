# @ropean/inline-assets Website V2

Brand new modern website built with **Tailwind CSS**.

## ✨ Features

- 🎨 **Tailwind CSS** - Modern utility-first CSS framework
- 🌓 **Dark Mode** - Full dark theme support
- 📱 **Responsive Design** - Perfect adaptation for all devices
- ⚡ **Performance Optimized** - Code splitting, lazy loading, optimized builds
- 🎭 **Smooth Animations** - Using Tailwind animations and transitions
- 🎯 **Zero Dependencies** - Only Vue 3, no other runtime dependencies

## 🚀 Quick Start

### Development

```bash
# Run from root directory
pnpm dev:v2

# Or directly in website-v2 directory
cd website-v2
pnpm dev
```

Visit `http://localhost:5173/`

### Build

```bash
# Run from root directory
pnpm build:v2

# Or directly in website-v2 directory
cd website-v2
pnpm build
```

Build output goes to `../dist-website-v2/`

### Preview

```bash
pnpm preview:v2
```

## 📁 Project Structure

```
website-v2/
├── public/              # Static assets
│   ├── favicon.svg
│   └── logo.svg
├── src/
│   ├── App.vue         # Main app component (single-file app)
│   ├── main.js         # Entry file
│   └── style.css       # Tailwind CSS configuration
├── index.html          # HTML template
├── package.json        # Dependencies configuration
├── postcss.config.js   # PostCSS configuration
├── tailwind.config.js  # Tailwind configuration
└── vite.config.js      # Vite configuration
```

## 🎨 Design Features

### Single-File Application
The entire website in one `App.vue` file, simple and efficient:
- Hero Section - Hero area, gradient background + animations
- Features Section - 6 feature cards with hover effects
- Playground Section - Interactive demo area (to be implemented)
- Quick Start Section - Quick start code examples
- Footer - Footer information

### Color Scheme
- **Primary**: Purple/Blue gradient (#667eea → #764ba2)
- **Dark Mode**: Slate series
- **Accent**: Gradient buttons and cards

### Animation Effects
- `animate-slide-up` - Slide up entrance
- `animate-slide-down` - Slide down entrance
- `animate-scale-in` - Scale entrance
- `animate-float` - Floating effect
- `animate-bounce` - Bounce effect

## 🔧 Tech Stack

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next generation frontend build tool
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS transformation tool
- **Autoprefixer** - Automatically add browser prefixes

## 📦 Dependencies

### Production Dependencies
- `vue` - Vue 3 framework

### Development Dependencies
- `@vitejs/plugin-vue` - Vite plugin for Vue
- `tailwindcss` - Tailwind CSS framework
- `postcss` - CSS processor
- `autoprefixer` - Auto prefixer
- `vite` - Build tool

## 🎯 Comparison with Old Version

| Feature | Old Version (website) | New Version (website-v2) |
|---------|----------------------|--------------------------|
| CSS Framework | Hand-written CSS | Tailwind CSS |
| File Count | Multiple components | Single-file app |
| Dependencies | 4 | 1 (runtime) |
| Dark Mode | Manual implementation | Tailwind built-in |
| Responsive | Hand-written media queries | Tailwind responsive classes |
| Animations | Hand-written CSS | Tailwind animation classes |
| Maintainability | Medium | Very high |

## 🚧 To Be Implemented

- [ ] Interactive Playground
- [ ] Code syntax highlighting
- [ ] More examples
- [ ] Mobile menu
- [ ] Page scroll animations
- [ ] Performance metrics display

## 📝 Customization

### Modify Color Scheme
Edit the `colors` configuration in `tailwind.config.js`

### Add Animations
Add new animations in the `animation` and `keyframes` sections of `tailwind.config.js`

### Modify Content
Directly edit the `src/App.vue` file

## 🌐 Deployment

Built files can be deployed to any static hosting service:
- GitHub Pages
- Vercel
- Netlify
- Cloudflare Pages

## 📄 License

MIT © 2025 ropean
