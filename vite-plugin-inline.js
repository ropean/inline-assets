/**
 * ============================================================================
 * Vite Plugin: Inline Assets
 * ============================================================================
 *
 * A Vite plugin that automatically inlines CSS, JavaScript, and SVG assets
 * into the HTML file after build, creating a single-file deployment.
 *
 * @author ropean
 * @version 1.0.0
 * @license Proprietary
 *
 * ============================================================================
 * Features:
 * ============================================================================
 * - Inlines CSS files into <style> tags in <head>
 * - Inlines JS files into <script> tags
 * - Inlines SVG files (img tags and link tags)
 * - Automatic Vite configuration for optimal CSS extraction
 * - Configurable exclusion patterns
 * - Automatic cleanup of inlined asset files
 *
 * ============================================================================
 * Usage:
 * ============================================================================
 * import viteInlineAssets from './plugins/vite-plugin-inline.js';
 *
 * export default defineConfig({
 *   plugins: [
 *     viteInlineAssets({
 *       css: true,
 *       js: true,
 *       svg: { img: false, link: true },
 *       excludes: ['assets/large-file.js']
 *     })
 *   ]
 * });
 *
 * ============================================================================
 * Important Notes:
 * ============================================================================
 * 1. This plugin automatically configures Vite build options:
 *    - cssCodeSplit: false (generates single CSS file)
 *    - manualChunks: undefined (prevents CSS bundling into JS)
 *
 * 2. The plugin runs in the 'closeBundle' hook, after all assets are built
 *
 * 3. Inlined assets are automatically deleted from the dist folder
 *
 * 4. CSS is injected at the beginning of <head> for optimal performance
 *
 * 5. If you manually configure cssCodeSplit or manualChunks in vite.config,
 *    the plugin will warn you about potential conflicts
 *
 * 6. Exclusion patterns can match:
 *    - Full paths: 'assets/index.js'
 *    - Filenames only: 'index.js'
 *
 * ============================================================================
 */

import fs from 'fs';
import path from 'path';
import logger from './logger.js';

/**
 * @typedef {Object} SvgOptions
 * @property {boolean} [img=false] - Whether to inline SVG in img tags
 * @property {boolean} [link=true] - Whether to inline SVG in link tags (favicon)
 */

/**
 * @typedef {Object} InlineAssetsOptions
 * @property {boolean} [css=true] - Whether to inline CSS files
 * @property {boolean} [js=true] - Whether to inline JavaScript files
 * @property {SvgOptions} [svg] - SVG inlining options
 * @property {string[]} [excludes=[]] - Array of file patterns to exclude from inlining
 */

/**
 * Vite plugin to inline CSS, JS, and SVG assets into HTML after build
 *
 * @param {InlineAssetsOptions} options - Plugin configuration options
 * @returns {import('vite').Plugin} Vite plugin object
 */
export default function viteInlineAssets(options = {}) {
  const defaultOptions = {
    css: true,
    js: true,
    svg: {
      img: false,
      link: true,
    },
    excludes: [],
  };

  const config = {
    ...defaultOptions,
    ...options,
    svg: {
      ...defaultOptions.svg,
      ...(options.svg || {}),
    },
  };

  /**
   * Check if a file path should be excluded from inlining
   *
   * Supports two matching modes:
   * 1. Full path matching: 'assets/index.js' matches '/assets/index.js'
   * 2. Filename matching: 'index.js' matches any file named 'index.js'
   *
   * @param {string} filePath - The file path to check (e.g., '/assets/index.js')
   * @returns {boolean} True if the file should be excluded from inlining
   */
  function isExcluded(filePath) {
    if (!config.excludes || config.excludes.length === 0) {
      return false;
    }

    // Normalize the file path (remove leading slash)
    const normalizedPath = filePath.replace(/^\/+/, '');

    return config.excludes.some((pattern) => {
      // Normalize the pattern
      const normalizedPattern = pattern.replace(/^\/+/, '');

      // Check if pattern contains path separator
      if (normalizedPattern.includes('/')) {
        // Match the full path pattern
        return normalizedPath.endsWith(normalizedPattern);
      } else {
        // Match only the filename
        const fileName = path.basename(normalizedPath);
        return fileName === normalizedPattern;
      }
    });
  }

  return {
    name: 'vite-inline-assets',
    apply: 'build',

    /**
     * Modify Vite config to ensure CSS is extracted as separate files
     * This runs before the config is finalized
     *
     * @param {import('vite').UserConfig} config - User's Vite configuration
     * @returns {import('vite').UserConfig} Modified configuration
     */
    config(config) {
      return {
        build: {
          cssCodeSplit: false, // Disable CSS code splitting to generate a single CSS file
          rollupOptions: {
            output: {
              manualChunks: undefined, // Prevent CSS from being bundled into JS
            },
          },
        },
      };
    },

    /**
     * Check for configuration conflicts after config is resolved
     * Warns users if their manual config overrides plugin settings
     *
     * @param {import('vite').ResolvedConfig} resolvedConfig - Final resolved configuration
     */
    configResolved(resolvedConfig) {
      // Check if cssCodeSplit is enabled (conflicts with plugin)
      if (resolvedConfig.build.cssCodeSplit === true) {
        logger.warning('⚠️  vite-inline-assets: cssCodeSplit is enabled, CSS inlining may not work correctly!');
        logger.info('   Recommended: Remove cssCodeSplit from vite.config.ts or set it to false');
      }

      // Check if manualChunks is configured (may cause CSS to bundle into JS)
      const output = resolvedConfig.build.rollupOptions?.output;
      if (output && !Array.isArray(output) && output.manualChunks !== undefined) {
        logger.warning('⚠️  vite-inline-assets: manualChunks is configured, CSS may be bundled into JS!');
        logger.info('   Recommended: Remove manualChunks from vite.config.ts');
      }
    },

    /**
     * Process HTML file after build is complete
     * Inlines CSS, JS, and SVG assets according to configuration
     * Runs after all build output has been written to disk
     */
    closeBundle() {
      const distPath = path.resolve(process.cwd(), 'dist');
      const htmlPath = path.join(distPath, 'index.html');

      if (!fs.existsSync(htmlPath)) return;

      let html = fs.readFileSync(htmlPath, 'utf-8');

      logger.newline(1, '');
      logger.info('Inlining assets in HTML...');

      // ========================================
      // Inline CSS files
      // ========================================
      if (config.css) {
        let inlinedStyles = '';
        const cssRegex = /<link[^>]*href=["']([^"']*\.css)["'][^>]*>/g;

        // Collect all CSS content from link tags
        html = html.replace(cssRegex, (match, cssFile) => {
          if (isExcluded(cssFile)) {
            logger.info(`Skipped CSS file (excluded): ${logger.file(cssFile)}`);
            return match;
          }

          const cssPath = path.join(distPath, cssFile);
          if (fs.existsSync(cssPath)) {
            const css = fs.readFileSync(cssPath, 'utf-8');
            fs.unlinkSync(cssPath);
            logger.success(`Inlined CSS file: ${logger.file(cssFile)}`);
            inlinedStyles += css + '\n';
            return ''; // Remove the original link tag
          }
          return match;
        });

        // Insert all CSS at the beginning of <head> for optimal performance
        if (inlinedStyles) {
          html = html.replace('<head>', `<head>\n  <style>\n${inlinedStyles}  </style>`);
        }
      }

      // ========================================
      // Inline JavaScript files
      // ========================================
      if (config.js) {
        const jsRegex = /<script[^>]*src=["']([^"']*\.js)["'][^>]*><\/script>/g;
        html = html.replace(jsRegex, (match, jsFile) => {
          if (isExcluded(jsFile)) {
            logger.warning(`Skipped JS file (excluded): ${logger.file(jsFile)}`);
            return match;
          }

          const jsPath = path.join(distPath, jsFile);
          if (fs.existsSync(jsPath)) {
            const js = fs.readFileSync(jsPath, 'utf-8');
            fs.unlinkSync(jsPath);
            logger.success(`Unlinked JS file: ${logger.file(jsFile)}`);
            return `<script type="module">\n${js}\n</script>`;
          }
          return match;
        });
      }

      // ========================================
      // Inline SVG files in img tags
      // ========================================
      if (config.svg.img) {
        const svgImgRegex = /<img[^>]*src=["']([^"']*\.svg)["'][^>]*>/g;
        html = html.replace(svgImgRegex, (match, svgFile) => {
          if (isExcluded(svgFile)) {
            logger.warning(`Skipped SVG file (excluded): ${logger.file(svgFile)}`);
            return match;
          }

          const svgPath = path.join(distPath, svgFile);
          if (fs.existsSync(svgPath)) {
            const svg = fs.readFileSync(svgPath, 'utf-8');
            fs.unlinkSync(svgPath);
            logger.success(`Unlinked SVG file (img): ${logger.file(svgFile)}`);
            return match.replace(/src=["'][^"']*["']/, `src="data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}"`);
          }
          return match;
        });
      }

      // ========================================
      // Inline SVG files in link tags (favicon/icon)
      // ========================================
      if (config.svg.link) {
        const iconRegex = /<link[^>]*href=["']([^"']*\.svg)["'][^>]*>/g;
        html = html.replace(iconRegex, (match, iconFile) => {
          if (isExcluded(iconFile)) {
            logger.warning(`Skipped SVG file (excluded): ${logger.file(iconFile)}`);
            return match;
          }

          const iconPath = path.join(distPath, iconFile);
          if (fs.existsSync(iconPath)) {
            const icon = fs.readFileSync(iconPath, 'utf-8');
            fs.unlinkSync(iconPath);
            logger.success(`Unlinked SVG file (link): ${logger.file(iconFile)}`);
            return `<link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,${Buffer.from(icon).toString('base64')}" />`;
          }
          return match;
        });
      }

      // Write the modified HTML back to disk
      fs.writeFileSync(htmlPath, html);
      logger.event(`Updated HTML with inlined assets => ${logger.chalk.yellowBright(htmlPath)}`);

      // Clean up empty assets directory if all files were inlined
      const assetsPath = path.join(distPath, 'assets');
      if (fs.existsSync(assetsPath)) {
        const files = fs.readdirSync(assetsPath);
        if (files.length === 0) {
          fs.rmdirSync(assetsPath);
          logger.success('Removed empty assets directory');
        }
      }
    },
  };
}
