import chalk from 'chalk';

export type MessageType =
  | 'success'
  | 'warning'
  | 'info'
  | 'error'
  | 'back'
  | 'title';

export class ShowMessage {
  static message(message: string, type?: MessageType, bold?: boolean): string {
    const colors = {
      error: '\x1b[31m',
      success: '\x1b[32m',
      warning: '\x1b[33m',
      info: '\x1b[34m',
      back: '\x1b[36m',
      title: '\x1b[35m',
      reset: '\x1b[0m'
    };

    if (type == 'success') {
      message = `✔️ ` + message;
    }
    if (type == 'error') {
      message = `❌ ` + message;
    }
    if (type == 'info') {
      message = 'ℹ️ ' + message;
    }

    if (type === 'warning') {
      message = `⚠️ ` + message;
    }
    if (type === 'back') {
      message = `🔙 ` + message;
    }

    const color = type ? colors[type] : colors.reset;
    if (bold !== undefined) {
      return bold === false
        ? `${color}${message}${colors.reset}`
        : `${color}${chalk.bold(message)}${colors.reset}`;
    } else {
      return `${color}${message}${colors.reset}`;
    }
  }
}
