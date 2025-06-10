export type MessageType = 'success' | 'warning' | 'info' | 'error';

export class ShowMessage {
  static message(message: string, type?: MessageType): string {
    const colors = {
      error: '\x1b[31m',
      success: '\x1b[32m',
      warning: '\x1b[33m',
      info: '\x1b[34m',
      reset: '\x1b[0m'
    };

    const color = type ? colors[type] : colors.reset;
    return `${color}${message}${colors.reset}`;
  }
}
