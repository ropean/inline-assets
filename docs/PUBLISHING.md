# Publishing Guide

This guide will help you publish `@ropean/inline-assets` to npm.

## Prerequisites

1. **npm Account**: Create an account at [npmjs.com](https://www.npmjs.com/)
2. **npm CLI**: Ensure npm is installed (`npm --version`)
3. **Login**: Run `npm login` and enter your credentials

## Pre-Publishing Checklist

- [ ] Update version in `package.json`
- [ ] Update `CHANGELOG.md` with new changes
- [ ] Update repository URLs in `package.json`
- [ ] Test the package locally
- [ ] Ensure all files are committed to git
- [ ] Create a git tag for the version

## Step-by-Step Publishing

### 1. Update Package Information

Edit `package.json` and update:

```json
{
  "name": "@ropean/inline-assets",
  "version": "1.0.0", // Update version as needed
  "repository": {
    "type": "git",
    "url": "https://github.com/ropean/inline-assets.git"
  },
  "bugs": {
    "url": "https://github.com/ropean/inline-assets/issues"
  },
  "homepage": "https://inline-assets.ropean.org"
}
```

### 2. Test Locally

Before publishing, test the package locally:

```bash
# Link the package locally
npm link

# In another project, link to test
cd /path/to/test-project
npm link @ropean/inline-assets

# Test both modes
# 1. As Vite plugin
# 2. As standalone function
```

### 3. Check Package Contents

Preview what will be published:

```bash
npm pack --dry-run
```

This shows all files that will be included. Verify:

- ✅ `src/` directory is included
- ✅ `README.md` is included
- ✅ `LICENSE` is included
- ❌ `node_modules/` is excluded
- ❌ Old files (`logger.ts`, `vite-plugin-inline.js`) are excluded

### 4. Publish to npm

```bash
# For scoped packages (required for @ropean/inline-assets)
npm publish --access public
```

### 5. Create Git Tag

After successful publishing:

```bash
git tag v1.0.0
git push origin v1.0.0
```

### 6. Create GitHub Release

1. Go to your repository on GitHub
2. Click "Releases" → "Create a new release"
3. Choose the tag you just created
4. Add release notes from `CHANGELOG.md`
5. Publish the release

## Post-Publishing

### Verify Installation

Test that others can install your package:

```bash
# In a new directory
npm install @ropean/inline-assets

# Verify it works
node -e "import('@ropean/inline-assets').then(m => console.log(m))"
```

### Update Documentation

- [ ] Add npm badge to README
- [ ] Update examples with correct package name
- [ ] Create a demo repository
- [ ] Write a blog post or tutorial

## Version Updates

For future updates, follow [Semantic Versioning](https://semver.org/):

- **Patch** (1.0.x): Bug fixes, no breaking changes
- **Minor** (1.x.0): New features, backward compatible
- **Major** (x.0.0): Breaking changes

```bash
# Update version
npm version patch  # 1.0.0 → 1.0.1
npm version minor  # 1.0.0 → 1.1.0
npm version major  # 1.0.0 → 2.0.0

# Publish
npm publish

# Push tags
git push --tags
```

## Troubleshooting

### "Package name already exists"

The package name `@ropean/inline-assets` is already registered to you. If you need to change it:

- Choose another name under your scope: `@ropean/another-name`
- Or use a different scope if you have one

### "403 Forbidden"

- Ensure you're logged in: `npm whoami`
- Check package name: `npm view @ropean/inline-assets`
- For scoped packages, always use `--access public`

### "Files not included"

- Check `.npmignore` file
- Verify `files` field in `package.json`
- Use `npm pack --dry-run` to preview

## Unpublishing

⚠️ **Warning**: Only unpublish within 72 hours of publishing!

```bash
npm unpublish @ropean/inline-assets@1.0.0
```

## Useful Commands

```bash
# Check what's published
npm view @ropean/inline-assets

# See all versions
npm view @ropean/inline-assets versions

# Check package info
npm info @ropean/inline-assets

# Download count
npm info @ropean/inline-assets downloads
```

## Resources

- [npm Documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [npm Package Best Practices](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
