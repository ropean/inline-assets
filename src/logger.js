/**
 * ============================================================================
 * Zero-Dependency Logger with ANSI Color Support
 * ============================================================================
 * 
 * A lightweight logger implementation that doesn't require any dependencies.
 * Supports ANSI color codes for terminal output.
 * 
 * @author ropean
 * @license MIT
 */

/**
 * @typedef {Object} LoggerInterface
 * @property {(message: string) => void} info - Log info message
 * @property {(message: string) => void} success - Log success message
 * @property {(message: string) => void} warning - Log warning message
 * @property {(message: string) => void} error - Log error message
 * @property {(message: string) => void} [event] - Log event message (optional)
 */

/**
 * ANSI color codes for terminal output
 */
const ANSI = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  
  // Foreground colors
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  gray: '\x1b[90m',
  
  // Bright foreground colors
  brightRed: '\x1b[91m',
  brightGreen: '\x1b[92m',
  brightYellow: '\x1b[93m',
  brightBlue: '\x1b[94m',
  brightMagenta: '\x1b[95m',
  brightCyan: '\x1b[96m',
  brightWhite: '\x1b[97m',
};

/**
 * Helper function to create colored text
 * @param {string} text - Text to colorize
 * @param {string} color - ANSI color code
 * @returns {string} Colored text
 */
function colorize(text, color) {
  return `${color}${text}${ANSI.reset}`;
}

/**
 * Built-in logger with zero dependencies
 * Implements the LoggerInterface
 */
class BuiltInLogger {
  /**
   * Log info message (blue)
   * @param {string} message - Message to log
   */
  info(message) {
    console.log(`${colorize('ℹ', ANSI.brightBlue)} ${message}`);
  }

  /**
   * Log success message (green)
   * @param {string} message - Message to log
   */
  success(message) {
    console.log(`${colorize('✓', ANSI.brightGreen)} ${message}`);
  }

  /**
   * Log warning message (yellow)
   * @param {string} message - Message to log
   */
  warning(message) {
    console.log(`${colorize('⚠', ANSI.brightYellow)} ${message}`);
  }

  /**
   * Log error message (red)
   * @param {string} message - Message to log
   */
  error(message) {
    console.log(`${colorize('✖', ANSI.brightRed)} ${message}`);
  }

  /**
   * Log event message (magenta)
   * @param {string} message - Message to log
   */
  event(message) {
    console.log(`${colorize('●', ANSI.brightMagenta)} ${message}`);
  }

  /**
   * Format file path (dim gray)
   * @param {string} path - File path
   * @returns {string} Formatted path
   */
  file(path) {
    return colorize(path, ANSI.gray);
  }

  /**
   * Print new lines
   * @param {number} count - Number of new lines
   */
  newline(count = 1) {
    for (let i = 0; i < count; i++) {
      console.log('');
    }
  }

  /**
   * Expose ANSI color utilities for advanced usage
   */
  get colors() {
    return {
      red: (text) => colorize(text, ANSI.red),
      green: (text) => colorize(text, ANSI.green),
      yellow: (text) => colorize(text, ANSI.yellow),
      blue: (text) => colorize(text, ANSI.blue),
      magenta: (text) => colorize(text, ANSI.magenta),
      cyan: (text) => colorize(text, ANSI.cyan),
      gray: (text) => colorize(text, ANSI.gray),
      brightRed: (text) => colorize(text, ANSI.brightRed),
      brightGreen: (text) => colorize(text, ANSI.brightGreen),
      brightYellow: (text) => colorize(text, ANSI.brightYellow),
      brightBlue: (text) => colorize(text, ANSI.brightBlue),
      brightMagenta: (text) => colorize(text, ANSI.brightMagenta),
      brightCyan: (text) => colorize(text, ANSI.brightCyan),
      bold: (text) => `${ANSI.bold}${text}${ANSI.reset}`,
      dim: (text) => `${ANSI.dim}${text}${ANSI.reset}`,
    };
  }
}

/**
 * Silent logger that doesn't output anything
 * Useful for testing or when logging is disabled
 */
class SilentLogger {
  info() {}
  success() {}
  warning() {}
  error() {}
  event() {}
  file(path) { return path; }
  newline() {}
  get colors() {
    const identity = (text) => text;
    return {
      red: identity,
      green: identity,
      yellow: identity,
      blue: identity,
      magenta: identity,
      cyan: identity,
      gray: identity,
      brightRed: identity,
      brightGreen: identity,
      brightYellow: identity,
      brightBlue: identity,
      brightMagenta: identity,
      brightCyan: identity,
      bold: identity,
      dim: identity,
    };
  }
}

/**
 * Create a logger instance
 * @param {LoggerInterface|boolean} [customLogger] - Custom logger or false to disable logging
 * @returns {LoggerInterface} Logger instance
 */
export function createLogger(customLogger) {
  if (customLogger === false) {
    return new SilentLogger();
  }
  
  if (customLogger && typeof customLogger === 'object') {
    // Validate custom logger has required methods
    const requiredMethods = ['info', 'success', 'warning', 'error'];
    const hasAllMethods = requiredMethods.every(
      method => typeof customLogger[method] === 'function'
    );
    
    if (!hasAllMethods) {
      console.warn(
        '[vite-plugin-inline] Custom logger missing required methods. Using built-in logger.'
      );
      return new BuiltInLogger();
    }
    
    return customLogger;
  }
  
  return new BuiltInLogger();
}

// Export default built-in logger instance
export default new BuiltInLogger();

