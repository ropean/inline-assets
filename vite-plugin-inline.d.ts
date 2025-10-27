/**
 * Type definitions for vite-plugin-inline
 * @author ropean
 * @version 1.0.0
 */

import type { Plugin } from 'vite';

/**
 * SVG inlining options
 */
export interface SvgOptions {
  /**
   * Whether to inline SVG in img tags
   * @default false
   */
  img?: boolean;

  /**
   * Whether to inline SVG in link tags (favicon/icon)
   * @default true
   */
  link?: boolean;
}

/**
 * Plugin configuration options
 */
export interface InlineAssetsOptions {
  /**
   * Whether to inline CSS files into <style> tags
   * @default true
   */
  css?: boolean;

  /**
   * Whether to inline JavaScript files into <script> tags
   * @default true
   */
  js?: boolean;

  /**
   * SVG inlining options
   */
  svg?: SvgOptions;

  /**
   * Array of file patterns to exclude from inlining
   *
   * Patterns can match:
   * - Full paths: 'assets/index.js'
   * - Filenames only: 'index.js'
   *
   * @default []
   * @example
   * excludes: ['assets/large-bundle.js', 'vendor.js']
   */
  excludes?: string[];
}

/**
 * Vite plugin to inline CSS, JS, and SVG assets into HTML after build
 *
 * @param options - Plugin configuration options
 * @returns Vite plugin object
 *
 * @example
 * ```typescript
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
 * ```
 */
export default function viteInlineAssets(options?: InlineAssetsOptions): Plugin;
