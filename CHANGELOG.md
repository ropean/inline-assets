# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-27

### Added
- Initial release
- Zero-dependency implementation with built-in ANSI color logger
- Dual export mode: Vite plugin + standalone function
- Inline CSS files into `<style>` tags
- Inline JavaScript files into `<script>` tags
- Inline SVG files as base64 data URIs (img and link tags)
- Configurable exclusion patterns for selective inlining
- Custom logger interface support
- Automatic cleanup of inlined files and empty directories
- Full TypeScript type definitions
- Comprehensive documentation and examples

### Features
- Works with any build tool (Webpack, Rollup, esbuild, etc.)
- Automatic Vite configuration for optimal CSS extraction
- Silent mode for testing and CI/CD environments
- File pattern matching (full path and filename)
- Detailed logging with color-coded output

[1.0.0]: https://github.com/yourusername/vite-plugin-inline/releases/tag/v1.0.0

