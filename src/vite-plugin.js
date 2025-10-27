/**
 * ============================================================================
 * Vite Plugin: Inline Assets
 * ============================================================================
 *
 * A Vite plugin that automatically inlines CSS, JavaScript, and SVG assets
 * into the HTML file after build, creating a single-file deployment.
 *
 * @author ropean
 * @license MIT
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
 * import viteInlineAssets from 'vite-plugin-inline';
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

import path from 'path';
import { inlineAssets } from './inline.js';
import { createLogger } from './logger.js';

/**
 * @typedef {Object} SvgOptions
 * @property {boolean} [img=false] - Whether to inline SVG in img tags
 * @property {boolean} [link=true] - Whether to inline SVG in link tags (favicon)
 */

/**
 * @typedef {Object} VitePluginOptions
 * @property {boolean} [css=true] - Whether to inline CSS files
 * @property {boolean} [js=true] - Whether to inline JavaScript files
 * @property {SvgOptions|boolean} [svg] - SVG inlining options
 * @property {string[]} [excludes=[]] - Array of file patterns to exclude from inlining
 * @property {string} [distDir='dist'] - Distribution directory name
 * @property {string} [htmlFileName='index.html'] - HTML file name to process
 * @property {'original'|'head-start'|'head-end'} [cssInsertPosition='original'] - Where to insert inlined CSS
 * @property {import('./logger.js').LoggerInterface|boolean} [logger] - Custom logger or false to disable logging
 */

/**
 * Vite plugin to inline CSS, JS, and SVG assets into HTML after build
 *
 * @param {VitePluginOptions} options - Plugin configuration options
 * @returns {import('vite').Plugin} Vite plugin object
 */
export function viteInlineAssets(options = {}) {
  const defaultOptions = {
    css: true,
    js: true,
    svg: {
      img: false,
      link: true,
    },
    excludes: [],
    distDir: 'dist',
    htmlFileName: 'index.html',
  };

  const config = {
    ...defaultOptions,
    ...options,
    svg: typeof options.svg === 'boolean'
      ? options.svg
      : {
          ...defaultOptions.svg,
          ...(options.svg || {}),
        },
  };

  const logger = createLogger(config.logger);

  return {
    name: 'vite-inline-assets',
    apply: 'build',

    /**
     * Modify Vite config to ensure CSS is extracted as separate files
     * This runs before the config is finalized
     *
     * @param {import('vite').UserConfig} viteConfig - User's Vite configuration
     * @returns {import('vite').UserConfig} Modified configuration
     */
    config(viteConfig) {
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
        logger.warning('cssCodeSplit is enabled, CSS inlining may not work correctly!');
        logger.info('Recommended: Remove cssCodeSplit from vite.config or set it to false');
      }

      // Check if manualChunks is configured (may cause CSS to bundle into JS)
      const output = resolvedConfig.build.rollupOptions?.output;
      if (output && !Array.isArray(output) && output.manualChunks !== undefined) {
        logger.warning('manualChunks is configured, CSS may be bundled into JS!');
        logger.info('Recommended: Remove manualChunks from vite.config');
      }
    },

    /**
     * Process HTML file after build is complete
     * Inlines CSS, JS, and SVG assets according to configuration
     * Runs after all build output has been written to disk
     */
    async closeBundle() {
      const distPath = path.resolve(process.cwd(), config.distDir);
      const htmlPath = path.join(distPath, config.htmlFileName);

      await inlineAssets({
        htmlPath,
        baseDir: distPath,
        css: config.css,
        js: config.js,
        svg: config.svg,
        excludes: config.excludes,
        cssInsertPosition: config.cssInsertPosition,
        removeInlinedFiles: true,
        cleanupEmptyDirs: true,
        logger: config.logger,
      });
    },
  };
}

export default viteInlineAssets;

