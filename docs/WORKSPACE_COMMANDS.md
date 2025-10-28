# Workspace Commands Guide

This project uses pnpm workspaces. The root directory and website directory now have consistent command behavior.

## Available Commands

### Development Server
Start the development server for the website:

```bash
# From root directory
pnpm dev

# From website directory
cd website && pnpm dev
```

Both commands will start the Vite dev server at `http://localhost:5173/`

### Build for Production
Build the website for production:

```bash
# From root directory
pnpm build

# From website directory
cd website && pnpm build
```

Both commands will build the website to `../dist-website/`

### Preview Production Build
Preview the production build locally:

```bash
# From root directory
pnpm preview

# From website directory
cd website && pnpm preview
```

Both commands will serve the production build for testing.

## How It Works

The root `package.json` uses pnpm workspace filters to run commands in the website directory:

```json
{
  "scripts": {
    "dev": "pnpm --filter website dev",
    "build": "pnpm --filter website build",
    "preview": "pnpm --filter website preview"
  }
}
```

This ensures:
- ✅ Consistent behavior between root and website directories
- ✅ Proper workspace dependency resolution
- ✅ Better performance with pnpm's linking strategy
- ✅ Simpler command structure

## Additional Commands

### Run Tests
```bash
pnpm test
```

### Check Code Syntax
```bash
pnpm check
```

### Install Dependencies
```bash
# Install all workspace dependencies
pnpm install

# Install only website dependencies
pnpm --filter website install
```

## Workspace Structure

```
vite-plugin-inline/
├── package.json          # Root package with workspace commands
├── pnpm-workspace.yaml   # Workspace configuration
├── src/                  # Main package source
├── test/                 # Tests
└── website/              # Website workspace
    ├── package.json      # Website-specific dependencies
    ├── src/              # Website source
    └── vite.config.js    # Vite configuration
```

## Tips

1. **Always use pnpm** instead of npm or yarn in this project
2. **Run from root** for convenience: `pnpm dev`, `pnpm build`, etc.
3. **Use filters** for specific workspaces: `pnpm --filter website <command>`
4. **Check workspace status**: `pnpm list --depth=0`

## Environment-Specific Behavior

The `vite.config.js` automatically adjusts the base path:
- **Development** (`pnpm dev`): Uses `/` → `http://localhost:5173/`
- **Production** (`pnpm build`): Uses `/inline-assets/` → for GitHub Pages

This means you don't need to worry about path configuration when switching between development and production!

