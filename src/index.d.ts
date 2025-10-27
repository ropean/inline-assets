/**
 * Type definitions for vite-plugin-inline
 */

import type { Plugin } from 'vite';

/**
 * Logger interface that users can implement for custom logging
 */
export interface LoggerInterface {
  /**
   * Log an informational message
   */
  info(message: string): void;

  /**
   * Log a success message
   */
  success(message: string): void;

  /**
   * Log a warning message
   */
  warning(message: string): void;

  /**
   * Log an error message
   */
  error(message: string): void;

  /**
   * Log an event message (optional)
   */
  event?(message: string): void;

  /**
   * Format a file path (optional)
   */
  file?(path: string): string;

  /**
   * Print new lines (optional)
   */
  newline?(count?: number): void;

  /**
   * Color utilities (optional)
   */
  colors?: {
    red(text: string): string;
    green(text: string): string;
    yellow(text: string): string;
    blue(text: string): string;
    magenta(text: string): string;
    cyan(text: string): string;
    gray(text: string): string;
    brightRed(text: string): string;
    brightGreen(text: string): string;
    brightYellow(text: string): string;
    brightBlue(text: string): string;
    brightMagenta(text: string): string;
    brightCyan(text: string): string;
    bold(text: string): string;
    dim(text: string): string;
  };
}

/**
 * SVG inlining options
 */
export interface SvgOptions {
  /**
   * Whether to inline SVG files referenced in <img> tags
   * @default false
   */
  img?: boolean;

  /**
   * Whether to inline SVG files referenced in <link> tags (favicon)
   * @default true
   */
  link?: boolean;
}

/**
 * Options for the standalone inlineAssets function
 */
export interface InlineAssetsOptions {
  /**
   * Path to the HTML file to process
   */
  htmlPath: string;

  /**
   * Base directory for resolving asset paths
   * @default Directory of the HTML file
   */
  baseDir?: string;

  /**
   * Whether to inline CSS files
   * @default true
   */
  css?: boolean;

  /**
   * Whether to inline JavaScript files
   * @default true
   */
  js?: boolean;

  /**
   * SVG inlining options
   * - true: Use default options { img: false, link: true }
   * - false: Disable SVG inlining
   * - object: Custom SVG options
   * @default true
   */
  svg?: boolean | SvgOptions;

  /**
   * Array of file patterns to exclude from inlining
   * Supports:
   * - Full path matching: 'assets/index.js'
   * - Filename matching: 'index.js'
   * @default []
   */
  excludes?: string[];

  /**
   * Whether to delete inlined asset files
   * @default true
   */
  removeInlinedFiles?: boolean;

  /**
   * Whether to remove empty directories after inlining
   * @default true
   */
  cleanupEmptyDirs?: boolean;

  /**
   * Where to insert inlined CSS
   * - 'original': Keep CSS at the original <link> tag position (preserves order)
   * - 'head-start': Move all CSS to the beginning of <head> (optimal performance)
   * - 'head-end': Move all CSS to the end of <head>
   * @default 'original'
   */
  cssInsertPosition?: 'original' | 'head-start' | 'head-end';

  /**
   * Custom logger or false to disable logging
   * @default Built-in logger
   */
  logger?: LoggerInterface | false;
}

/**
 * Result of the inlineAssets operation
 */
export interface InlineAssetsResult {
  /**
   * Whether the operation completed successfully
   */
  success: boolean;

  /**
   * List of files that were inlined
   */
  inlinedFiles: string[];

  /**
   * List of errors that occurred
   */
  errors: string[];
}

/**
 * Options for the Vite plugin
 */
export interface VitePluginOptions {
  /**
   * Whether to inline CSS files
   * @default true
   */
  css?: boolean;

  /**
   * Whether to inline JavaScript files
   * @default true
   */
  js?: boolean;

  /**
   * SVG inlining options
   * - true: Use default options { img: false, link: true }
   * - false: Disable SVG inlining
   * - object: Custom SVG options
   * @default { img: false, link: true }
   */
  svg?: boolean | SvgOptions;

  /**
   * Array of file patterns to exclude from inlining
   * Supports:
   * - Full path matching: 'assets/index.js'
   * - Filename matching: 'index.js'
   * @default []
   */
  excludes?: string[];

  /**
   * Distribution directory name
   * @default 'dist'
   */
  distDir?: string;

  /**
   * HTML file name to process
   * @default 'index.html'
   */
  htmlFileName?: string;

  /**
   * Where to insert inlined CSS
   * - 'original': Keep CSS at the original <link> tag position (preserves order)
   * - 'head-start': Move all CSS to the beginning of <head> (optimal performance)
   * - 'head-end': Move all CSS to the end of <head>
   * @default 'original'
   */
  cssInsertPosition?: 'original' | 'head-start' | 'head-end';

  /**
   * Custom logger or false to disable logging
   * @default Built-in logger
   */
  logger?: LoggerInterface | false;
}

/**
 * Inline CSS, JavaScript, and SVG assets into an HTML file
 * 
 * @param options - Configuration options
 * @returns Promise resolving to operation result
 * 
 * @example
 * ```typescript
 * // Basic usage
 * await inlineAssets({
 *   htmlPath: './dist/index.html'
 * });
 * ```
 * 
 * @example
 * ```typescript
 * // Advanced usage
 * const result = await inlineAssets({
 *   htmlPath: './dist/index.html',
 *   baseDir: './dist',
 *   css: true,
 *   js: true,
 *   svg: { img: true, link: true },
 *   excludes: ['vendor.js'],
 *   logger: customLogger
 * });
 * 
 * if (result.success) {
 *   console.log(`Inlined ${result.inlinedFiles.length} files`);
 * }
 * ```
 */
export function inlineAssets(options: InlineAssetsOptions): Promise<InlineAssetsResult>;

/**
 * Create a logger instance
 * 
 * @param customLogger - Custom logger or false to disable logging
 * @returns Logger instance
 * 
 * @example
 * ```typescript
 * // Use built-in logger
 * const logger = createLogger();
 * 
 * // Use custom logger
 * const logger = createLogger({
 *   info: (msg) => console.log('[INFO]', msg),
 *   success: (msg) => console.log('[OK]', msg),
 *   warning: (msg) => console.warn('[WARN]', msg),
 *   error: (msg) => console.error('[ERR]', msg),
 * });
 * 
 * // Disable logging
 * const logger = createLogger(false);
 * ```
 */
export function createLogger(customLogger?: LoggerInterface | false): LoggerInterface;

/**
 * Built-in logger instance with zero dependencies
 */
export const defaultLogger: LoggerInterface;

/**
 * Vite plugin to inline CSS, JS, and SVG assets into HTML after build
 * 
 * @param options - Plugin configuration options
 * @returns Vite plugin object
 * 
 * @example
 * ```typescript
 * import { defineConfig } from 'vite';
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
 * ```
 */
export function viteInlineAssets(options?: VitePluginOptions): Plugin;

/**
 * Default export: Vite plugin
 */
export default viteInlineAssets;

