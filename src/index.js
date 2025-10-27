/**
 * ============================================================================
 * Vite Plugin Inline - Main Entry Point
 * ============================================================================
 * 
 * Dual export module:
 * 1. Default export: Vite plugin for seamless integration
 * 2. Named export: Standalone function for any build tool
 * 
 * @author ropean
 * @license MIT
 * 
 * ============================================================================
 * Usage Examples:
 * ============================================================================
 * 
 * // As a Vite plugin
 * import viteInlineAssets from 'vite-plugin-inline';
 * 
 * export default defineConfig({
 *   plugins: [
 *     viteInlineAssets({
 *       css: true,
 *       js: true,
 *       svg: { img: false, link: true }
 *     })
 *   ]
 * });
 * 
 * // As a standalone function
 * import { inlineAssets } from 'vite-plugin-inline';
 * 
 * await inlineAssets({
 *   htmlPath: './dist/index.html',
 *   css: true,
 *   js: true
 * });
 * 
 * // With custom logger
 * import { inlineAssets, createLogger } from 'vite-plugin-inline';
 * 
 * const myLogger = {
 *   info: (msg) => console.log('[INFO]', msg),
 *   success: (msg) => console.log('[SUCCESS]', msg),
 *   warning: (msg) => console.warn('[WARN]', msg),
 *   error: (msg) => console.error('[ERROR]', msg),
 * };
 * 
 * await inlineAssets({
 *   htmlPath: './dist/index.html',
 *   logger: myLogger
 * });
 * 
 * ============================================================================
 */

// Export standalone inline function
export { inlineAssets } from './inline.js';

// Export logger utilities
export { createLogger } from './logger.js';
export { default as defaultLogger } from './logger.js';

// Export Vite plugin (default export)
export { viteInlineAssets } from './vite-plugin.js';
export { viteInlineAssets as default } from './vite-plugin.js';

