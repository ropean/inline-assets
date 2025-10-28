/**
 * Simple browser-side inliner for the website playground.
 * It does NOT read files; it replaces matching tags in the provided HTML
 * with the CSS/JS strings supplied by the user.
 */

/**
 * Inline CSS/JS into provided HTML string.
 *
 * @param {Object} params
 * @param {string} params.html - The original HTML content
 * @param {string} params.css - CSS content to inline
 * @param {string} params.js - JavaScript content to inline
 * @param {'original'|'head-start'|'head-end'} [params.cssInsertPosition='original'] - CSS placement strategy
 * @returns {{html: string, stats: {originalSize: number, inlinedSize: number, reducedBytes: number}, error: string|null}}
 */
export function inlineInBrowser({ html, css, js, cssInsertPosition = 'original' }) {
  try {
    // Validate inputs
    if (!html || typeof html !== 'string') {
      throw new Error('HTML content is required and must be a string');
    }

    let resultHtml = String(html);
    const cssContent = String(css || '');
    const jsContent = String(js || '');

    // Check if HTML has basic structure
    if (!resultHtml.includes('<html') && !resultHtml.includes('<head')) {
      throw new Error('HTML must contain valid HTML structure with <html> and <head> tags');
    }

    const originalSize = new Blob([resultHtml]).size + new Blob([cssContent]).size + new Blob([jsContent]).size;

    // Replace CSS links
    const cssLinkRegex = /<link[^>]*href=["'][^"']*\.css["'][^>]*>/gi;
    if (cssInsertPosition === 'original') {
      resultHtml = resultHtml.replace(cssLinkRegex, () => {
        return `<style>\n${cssContent}\n</style>`;
      });
    } else {
      // Remove CSS links, collect and insert at specified position
      const hadCssLinks = cssLinkRegex.test(resultHtml);
      resultHtml = resultHtml.replace(cssLinkRegex, '');
      if (hadCssLinks && cssContent) {
        if (cssInsertPosition === 'head-start') {
          if (!resultHtml.includes('<head>')) {
            throw new Error('Cannot insert CSS at head-start: <head> tag not found');
          }
          resultHtml = resultHtml.replace('<head>', `<head>\n  <style>\n${cssContent}\n  </style>`);
        } else if (cssInsertPosition === 'head-end') {
          if (!resultHtml.includes('</head>')) {
            throw new Error('Cannot insert CSS at head-end: </head> tag not found');
          }
          resultHtml = resultHtml.replace('</head>', `  <style>\n${cssContent}\n  </style>\n</head>`);
        }
      }
    }

    // Replace JS script src
    const jsScriptRegex = /<script[^>]*src=["'][^"']*\.js["'][^>]*><\/script>/gi;
    resultHtml = resultHtml.replace(jsScriptRegex, () => {
      return `<script type="module">\n${jsContent}\n</script>`;
    });

    const inlinedSize = new Blob([resultHtml]).size;

    return {
      html: resultHtml,
      stats: {
        originalSize,
        inlinedSize,
        reducedBytes: Math.max(0, originalSize - inlinedSize),
      },
      error: null
    };
  } catch (err) {
    return {
      html: '',
      stats: {
        originalSize: 0,
        inlinedSize: 0,
        reducedBytes: 0,
      },
      error: err.message || 'An error occurred during inlining'
    };
  }
}


