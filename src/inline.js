/**
 * ============================================================================
 * Inline Assets - Core Logic
 * ============================================================================
 * 
 * Standalone function to inline CSS, JavaScript, and SVG assets into HTML.
 * Can be used independently or as part of a build tool plugin.
 * 
 * @author ropean
 * @license MIT
 */

import fs from 'fs';
import path from 'path';
import { createLogger } from './logger.js';

/**
 * @typedef {Object} SvgOptions
 * @property {boolean} [img=false] - Whether to inline SVG in img tags
 * @property {boolean} [link=true] - Whether to inline SVG in link tags (favicon)
 */

/**
 * @typedef {Object} InlineAssetsOptions
 * @property {string} htmlPath - Path to the HTML file to process
 * @property {string} [baseDir] - Base directory for resolving asset paths (defaults to HTML file's directory)
 * @property {boolean} [css=true] - Whether to inline CSS files
 * @property {boolean} [js=true] - Whether to inline JavaScript files
 * @property {SvgOptions|boolean} [svg=true] - SVG inlining options (true = default options, false = disable)
 * @property {string[]} [excludes=[]] - Array of file patterns to exclude from inlining
 * @property {boolean} [removeInlinedFiles=true] - Whether to delete inlined asset files
 * @property {boolean} [cleanupEmptyDirs=true] - Whether to remove empty directories after inlining
 * @property {import('./logger.js').LoggerInterface|boolean} [logger] - Custom logger or false to disable logging
 */

/**
 * Check if a file path should be excluded from inlining
 * 
 * Supports two matching modes:
 * 1. Full path matching: 'assets/index.js' matches '/assets/index.js'
 * 2. Filename matching: 'index.js' matches any file named 'index.js'
 * 
 * @param {string} filePath - The file path to check (e.g., '/assets/index.js')
 * @param {string[]} excludes - Array of exclusion patterns
 * @returns {boolean} True if the file should be excluded from inlining
 */
function isExcluded(filePath, excludes) {
  if (!excludes || excludes.length === 0) {
    return false;
  }

  // Normalize the file path (remove leading slash)
  const normalizedPath = filePath.replace(/^\/+/, '');

  return excludes.some((pattern) => {
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

/**
 * Inline CSS, JavaScript, and SVG assets into an HTML file
 * 
 * @param {InlineAssetsOptions} options - Configuration options
 * @returns {Promise<{success: boolean, inlinedFiles: string[], errors: string[]}>} Result object
 * 
 * @example
 * // Basic usage
 * await inlineAssets({
 *   htmlPath: './dist/index.html'
 * });
 * 
 * @example
 * // Advanced usage with custom options
 * await inlineAssets({
 *   htmlPath: './dist/index.html',
 *   baseDir: './dist',
 *   css: true,
 *   js: true,
 *   svg: { img: true, link: true },
 *   excludes: ['vendor.js'],
 *   logger: customLogger
 * });
 */
export async function inlineAssets(options) {
  const {
    htmlPath,
    baseDir = path.dirname(htmlPath),
    css = true,
    js = true,
    svg = true,
    excludes = [],
    removeInlinedFiles = true,
    cleanupEmptyDirs = true,
    logger: customLogger,
  } = options;

  const logger = createLogger(customLogger);
  const inlinedFiles = [];
  const errors = [];

  // Normalize SVG options
  const svgOptions = typeof svg === 'boolean'
    ? (svg ? { img: false, link: true } : { img: false, link: false })
    : { img: false, link: true, ...svg };

  // Validate HTML file exists
  if (!fs.existsSync(htmlPath)) {
    const error = `HTML file not found: ${htmlPath}`;
    logger.error(error);
    return { success: false, inlinedFiles, errors: [error] };
  }

  try {
    let html = fs.readFileSync(htmlPath, 'utf-8');
    logger.newline(1);
    logger.info('Starting asset inlining...');

    // ========================================
    // Inline CSS files
    // ========================================
    if (css) {
      let inlinedStyles = '';
      const cssRegex = /<link[^>]*href=["']([^"']*\.css)["'][^>]*>/g;

      // Collect all CSS content from link tags
      html = html.replace(cssRegex, (match, cssFile) => {
        if (isExcluded(cssFile, excludes)) {
          logger.info(`Skipped CSS (excluded): ${logger.file(cssFile)}`);
          return match;
        }

        const cssPath = path.join(baseDir, cssFile);
        if (fs.existsSync(cssPath)) {
          try {
            const cssContent = fs.readFileSync(cssPath, 'utf-8');
            inlinedStyles += cssContent + '\n';
            inlinedFiles.push(cssFile);
            
            if (removeInlinedFiles) {
              fs.unlinkSync(cssPath);
            }
            
            logger.success(`Inlined CSS: ${logger.file(cssFile)}`);
            return ''; // Remove the original link tag
          } catch (err) {
            const error = `Failed to inline CSS ${cssFile}: ${err.message}`;
            logger.error(error);
            errors.push(error);
            return match;
          }
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
    if (js) {
      const jsRegex = /<script[^>]*src=["']([^"']*\.js)["'][^>]*><\/script>/g;
      html = html.replace(jsRegex, (match, jsFile) => {
        if (isExcluded(jsFile, excludes)) {
          logger.info(`Skipped JS (excluded): ${logger.file(jsFile)}`);
          return match;
        }

        const jsPath = path.join(baseDir, jsFile);
        if (fs.existsSync(jsPath)) {
          try {
            const jsContent = fs.readFileSync(jsPath, 'utf-8');
            inlinedFiles.push(jsFile);
            
            if (removeInlinedFiles) {
              fs.unlinkSync(jsPath);
            }
            
            logger.success(`Inlined JS: ${logger.file(jsFile)}`);
            return `<script type="module">\n${jsContent}\n</script>`;
          } catch (err) {
            const error = `Failed to inline JS ${jsFile}: ${err.message}`;
            logger.error(error);
            errors.push(error);
            return match;
          }
        }
        return match;
      });
    }

    // ========================================
    // Inline SVG files in img tags
    // ========================================
    if (svgOptions.img) {
      const svgImgRegex = /<img[^>]*src=["']([^"']*\.svg)["'][^>]*>/g;
      html = html.replace(svgImgRegex, (match, svgFile) => {
        if (isExcluded(svgFile, excludes)) {
          logger.info(`Skipped SVG (excluded): ${logger.file(svgFile)}`);
          return match;
        }

        const svgPath = path.join(baseDir, svgFile);
        if (fs.existsSync(svgPath)) {
          try {
            const svgContent = fs.readFileSync(svgPath, 'utf-8');
            const base64 = Buffer.from(svgContent).toString('base64');
            inlinedFiles.push(svgFile);
            
            if (removeInlinedFiles) {
              fs.unlinkSync(svgPath);
            }
            
            logger.success(`Inlined SVG (img): ${logger.file(svgFile)}`);
            return match.replace(/src=["'][^"']*["']/, `src="data:image/svg+xml;base64,${base64}"`);
          } catch (err) {
            const error = `Failed to inline SVG ${svgFile}: ${err.message}`;
            logger.error(error);
            errors.push(error);
            return match;
          }
        }
        return match;
      });
    }

    // ========================================
    // Inline SVG files in link tags (favicon/icon)
    // ========================================
    if (svgOptions.link) {
      const iconRegex = /<link[^>]*href=["']([^"']*\.svg)["'][^>]*>/g;
      html = html.replace(iconRegex, (match, iconFile) => {
        if (isExcluded(iconFile, excludes)) {
          logger.info(`Skipped SVG (excluded): ${logger.file(iconFile)}`);
          return match;
        }

        const iconPath = path.join(baseDir, iconFile);
        if (fs.existsSync(iconPath)) {
          try {
            const iconContent = fs.readFileSync(iconPath, 'utf-8');
            const base64 = Buffer.from(iconContent).toString('base64');
            inlinedFiles.push(iconFile);
            
            if (removeInlinedFiles) {
              fs.unlinkSync(iconPath);
            }
            
            logger.success(`Inlined SVG (link): ${logger.file(iconFile)}`);
            return `<link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,${base64}" />`;
          } catch (err) {
            const error = `Failed to inline SVG ${iconFile}: ${err.message}`;
            logger.error(error);
            errors.push(error);
            return match;
          }
        }
        return match;
      });
    }

    // Write the modified HTML back to disk
    fs.writeFileSync(htmlPath, html);
    logger.event(`Updated HTML: ${logger.colors.brightYellow(htmlPath)}`);

    // Clean up empty directories
    if (cleanupEmptyDirs && removeInlinedFiles) {
      const assetsPath = path.join(baseDir, 'assets');
      if (fs.existsSync(assetsPath)) {
        const files = fs.readdirSync(assetsPath);
        if (files.length === 0) {
          fs.rmdirSync(assetsPath);
          logger.success('Removed empty assets directory');
        }
      }
    }

    logger.newline(1);
    logger.success(`Inlining complete! ${inlinedFiles.length} file(s) processed`);

    return {
      success: errors.length === 0,
      inlinedFiles,
      errors,
    };
  } catch (err) {
    const error = `Fatal error during inlining: ${err.message}`;
    logger.error(error);
    return {
      success: false,
      inlinedFiles,
      errors: [...errors, error],
    };
  }
}

export default inlineAssets;

