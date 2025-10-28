# Component Structure

This document describes the component architecture of the website-v2 project.

## Component Hierarchy

```
App.vue (Root)
├── Navbar.vue          - Navigation bar with logo, menu, and theme toggle
├── Hero.vue            - Hero section with animated background
├── Features.vue        - Feature cards grid
├── Playground.vue      - Interactive code playground
├── QuickStart.vue      - Quick start code examples
├── Footer.vue          - Footer with copyright
└── ScrollToTop.vue     - Floating scroll-to-top button
```

## Component Details

### App.vue
- **Purpose**: Root component, manages global state
- **State**: `isDark` (theme state)
- **Methods**: `toggleDark()` - toggles dark mode
- **Responsibilities**: Theme management, component orchestration

### Navbar.vue
- **Purpose**: Top navigation bar
- **Props**: `isDark` (Boolean)
- **Emits**: `toggle-theme` - when theme button is clicked
- **Features**:
  - Logo with hover effect
  - Sliding glass indicator on menu hover
  - GitHub and npm links
  - Theme toggle button

### Hero.vue
- **Purpose**: Landing section with call-to-action
- **State**: `copied` (copy button state)
- **Features**:
  - Animated gradient background
  - Install command with copy button
  - Scroll indicator
  - Responsive layout

### Features.vue
- **Purpose**: Display product features in a grid
- **Data**: `features` array (6 feature cards)
- **Features**:
  - Animated cards on hover
  - Icon + title + description layout
  - Responsive grid (1/2/3 columns)

### Playground.vue
- **Purpose**: Interactive code editor and inliner
- **State**:
  - `inputHtml`, `inputCss`, `inputJs` - user inputs
  - `outputHtml` - processed result
  - `isProcessing` - loading state
  - `selectedPreset` - current preset
  - `playgroundMessage` - success/error messages
- **Features**:
  - 3 preset examples
  - Real-time HTML/CSS/JS inlining
  - Copy, download, and preview output
  - Error handling

### QuickStart.vue
- **Purpose**: Show integration examples
- **Features**:
  - Vite plugin example
  - Standalone function example
  - Syntax-highlighted code blocks

### Footer.vue
- **Purpose**: Page footer
- **Features**:
  - Copyright notice
  - Author link

### ScrollToTop.vue
- **Purpose**: Floating button to scroll to top
- **State**: `showScrollTop` (visibility based on scroll position)
- **Features**:
  - Shows after scrolling past first screen
  - Smooth scroll animation
  - Fade in/out transition

## Styling

All components use:
- **Tailwind CSS v4** for utility classes
- **Custom CSS variables** defined in `src/style.css`
- **Scoped styles** where needed (transitions, animations)

## State Management

- **Global state**: Managed in `App.vue` (theme)
- **Local state**: Each component manages its own state
- **Props/Emits**: Used for parent-child communication

## Benefits of This Structure

1. **Modularity**: Each component is self-contained
2. **Reusability**: Components can be easily reused
3. **Maintainability**: Easier to find and fix issues
4. **Testability**: Components can be tested independently
5. **Readability**: Clear separation of concerns
6. **Performance**: Easier to optimize individual components

