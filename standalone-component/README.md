# ScrollToTop Standalone Component

A lightweight, zero-dependency scroll-to-top button with a beautiful rocket animation.

## Features

- 🚀 Beautiful rocket animation with flame effects
- 📦 Zero dependencies
- 🎨 Fully customizable
- ⚡ Lightweight (~3KB minified)
- 🔧 Easy to integrate
- 📱 Mobile-friendly

## Installation

### Via CDN

```html
<script src="https://cdn.jsdelivr.net/npm/@aceapp/scroll-to-top/dist/scroll-to-top.min.js"></script>
```

### Via npm

```bash
npm install @aceapp/scroll-to-top
```

## Usage

### Basic Usage

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Website</title>
</head>
<body>
  <!-- Your content -->

  <!-- Include the script -->
  <script src="scroll-to-top.js"></script>
  <script>
    // Initialize the component
    new ScrollToTop();
  </script>
</body>
</html>
```

### With Options

```javascript
new ScrollToTop({
  showAfter: 500,           // Show after scrolling 500px (default: window.innerHeight)
  animationDuration: 1500,  // Animation duration in ms (default: 1500)
  scrollDelay: 500,         // Delay before scrolling starts (default: 500)
  rocketEmoji: '🚀',        // Custom rocket emoji (default: '🚀')
  flameEmoji: '🔥'          // Custom flame emoji (default: '🔥')
});
```

### ES6 Module

```javascript
import ScrollToTop from '@aceapp/scroll-to-top';

const scrollToTop = new ScrollToTop({
  showAfter: 300,
  animationDuration: 2000
});
```

### CommonJS

```javascript
const ScrollToTop = require('@aceapp/scroll-to-top');

new ScrollToTop();
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `showAfter` | number | `window.innerHeight` | Number of pixels to scroll before showing the button |
| `animationDuration` | number | `1500` | Duration of the launch animation in milliseconds |
| `scrollDelay` | number | `500` | Delay before the page starts scrolling to top |
| `rocketEmoji` | string | `'🚀'` | Emoji to use for the rocket |
| `flameEmoji` | string | `'🔥'` | Emoji to use for the flame |

## Methods

### destroy()

Remove the button and clean up event listeners:

```javascript
const scrollToTop = new ScrollToTop();

// Later...
scrollToTop.destroy();
```

## Browser Support

- Chrome/Edge: Latest
- Firefox: Latest
- Safari: Latest
- Opera: Latest
- IE: Not supported

## License

MIT © AceApp

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
