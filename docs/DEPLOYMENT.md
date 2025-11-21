# Deployment Guide

This guide explains how to set up automated publishing for the NPM package and website deployment.

## Overview

There are two separate workflows:

1. **Publish NPM Package** (`publish-package.yml`) - Publishes package to npm when a version tag is pushed to `main` branch
2. **Deploy Website** (`deploy-website.yml`) - Deploys documentation website to GitHub Pages when code is pushed to `release` branch

## Prerequisites

### 1. NPM Token (Required for Package Publishing)

**Purpose**: Allows GitHub Actions to publish your package to npm registry.

**Steps to create**:

1. Log in to [npmjs.com](https://www.npmjs.com/)
2. Click your profile icon → **Access Tokens**
3. Click **Generate New Token** → **Classic Token**
4. Select **Automation** type
5. Copy the generated token

**Add to GitHub**:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `NPM_TOKEN`
5. Value: Paste your npm token
6. Click **Add secret**

### 2. GitHub Pages (Required for Website Deployment)

**Steps to enable**:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Select branch: `gh-pages`
5. Select folder: `/ (root)`
6. Click **Save**

## Usage

### Publishing NPM Package

**Trigger**: Push a version tag (format: `v*.*.*`) to the `main` branch

```bash
# 1. Make sure you're on main branch and code is committed
git checkout main
git add .
git commit -m "feat: add new feature"

# 2. Create and push a version tag (must start with 'v')
git tag v1.0.3
git push origin v1.0.3

# 3. GitHub Actions will automatically:
#    - Update package.json version to 1.0.3
#    - Commit the version change to main
#    - Run tests (pnpm run check && pnpm run test)
#    - Publish to npm
#    - Create a GitHub release
```

**Manual Trigger**:

1. Go to **Actions** tab → **Publish NPM Package**
2. Click **Run workflow**
3. Enter version tag (e.g., `v1.0.3`)
4. Click **Run workflow**

### Deploying Website

**Trigger**: Push code to the `release` branch

```bash
# 1. Merge or push changes to release branch
git checkout release
git merge main  # or make your changes
git push origin release

# 2. GitHub Actions will automatically:
#    - Install dependencies (pnpm install)
#    - Build website (pnpm run build)
#    - Deploy to GitHub Pages (from ./dist directory)
```

**Manual Trigger**:

1. Go to **Actions** tab → **Deploy Website**
2. Click **Run workflow**
3. Select `release` branch
4. Click **Run workflow**

## Workflow Details

### Publish NPM Package Workflow

**Steps**:

1. ✅ Validate tag format (`v*.*.*`)
2. ✅ Extract version (v1.0.3 → 1.0.3)
3. ✅ Update `package.json` version
4. ✅ Commit version change to main
5. ✅ Install dependencies (`pnpm install`)
6. ✅ Run tests (`pnpm run check && pnpm run test`)
7. ✅ Publish to npm
8. ✅ Create GitHub release

**Outputs**:

- NPM package published
- GitHub release created
- Version committed to main branch

### Deploy Website Workflow

**Steps**:

1. ✅ Checkout `release` branch
2. ✅ Install dependencies (`pnpm install`)
3. ✅ Build website (`pnpm run build`)
4. ✅ Deploy `./dist` to `gh-pages` branch

**Outputs**:

- Website deployed to GitHub Pages

## Verification

### After NPM Package Publishing

- **NPM Package**: <https://www.npmjs.com/package/@ropean/inline-assets>
- **GitHub Release**: <https://github.com/ropean/inline-assets/releases>
- **Main Branch**: Check that version is updated in `package.json`

### After Website Deployment

- **Website**: <https://ropean.github.io/inline-assets/>
- **gh-pages Branch**: Check that files are updated

## Troubleshooting

### NPM Package Publishing Issues

**"Error: Tag must be in format v*.*.*"**

- Tag must start with 'v' followed by semantic version
- Valid: `v1.0.3`, `v2.1.0`, `v0.0.1`
- Invalid: `1.0.3`, `version-1.0.3`, `v1.0`

**"npm publish failed"**

- Verify `NPM_TOKEN` is set correctly in repository secrets
- Check token has **Automation** permissions
- Ensure version doesn't already exist on npm

**"Tests failed"**

- Run `pnpm run check` and `pnpm run test` locally first
- Fix any errors before pushing tag

### Website Deployment Issues

**"Build failed"**

- Run `pnpm run build` locally to check for errors
- Verify all dependencies are in `package.json`

**"GitHub Pages not updating"**

- Check GitHub Pages is enabled and set to `gh-pages` branch
- Verify workflow completed successfully in Actions tab
- GitHub Pages may take a few minutes to update

**"Permission denied"**

- Ensure workflow has write permissions
- Check branch protection rules don't block the workflow

## Security Notes

- Never commit tokens to your repository
- Use GitHub Secrets for all sensitive tokens
- `NPM_TOKEN` should have minimal permissions (Automation type)
- `GITHUB_TOKEN` is automatically provided by GitHub Actions

## Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [npm Token Documentation](https://docs.npmjs.com/about-access-tokens)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
