// logger.ts
import chalk from 'chalk';

/**
 * Vite-themed logger with chalk capabilities
 */
class ViteLogger {
  private theme = {
    primary: '#646cff',
    success: '#00dc82',
    warning: '#ff9a00',
    error: '#ff4d4f',
    info: '#3498db',
    dim: '#666666',
  };

  // Proxy all chalk methods through the instance
  public get chalk(): typeof chalk {
    return chalk;
  }

  // Custom styled loggers
  public info = (message: string) => {
    console.log(`${chalk.hex(this.theme.info).bold('🔍')} ${message}`);
  };

  public success = (message: string) => {
    console.log(`${chalk.hex(this.theme.success).bold('✅')} ${message}`);
  };

  public warning = (message: string) => {
    console.log(`${chalk.hex(this.theme.warning).bold('⚠️ ')} ${message}`);
  };

  public error = (message: string) => {
    console.log(`${chalk.hex(this.theme.error).bold('❌')} ${message}`);
  };

  public event = (message: string) => {
    console.log(`${chalk.hex(this.theme.primary).bold('🎉')} ${message}`);
  };

  // File path formatting
  public file = (path: string) => {
    return chalk.hex(this.theme.dim)(path);
  };

  // New line
  public newline = (line: number = 1, message: string = '') => {
    for (let i = 0; i < line; i++) {
      if (i === line) {
        console.log(`${message}`);
        break;
      }

      console.log('');
    }
  };

  // Asset type formatting
  public asset = {
    css: (path: string) => chalk.hex(this.theme.info)(path),
    js: (path: string) => chalk.hex(this.theme.success)(path),
    svg: (path: string) => chalk.hex(this.theme.warning)(path),
    html: (path: string) => chalk.hex(this.theme.primary)(path),
  };

  // Generic log with custom icon and color
  public log = (icon: string, color: string, message: string) => {
    console.log(`${chalk.hex(color).bold(icon)} ${message}`);
  };

  // Theme accessor
  public getTheme() {
    return { ...this.theme };
  }
}

// Create singleton instance
export const logger = new ViteLogger();

// Re-export chalk for direct usage
// export { chalk };

// Default export
export default logger;
