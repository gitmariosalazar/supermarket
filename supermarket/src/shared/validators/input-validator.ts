import promptSync from 'prompt-sync';
import { ShowMessage } from '../../ui/messages/message.util';

const prompt = promptSync({ sigint: true });

export function isValidNumberPrompt(message: string): number {
  let input: string;
  let num: number;
  while (true) {
    input = prompt(message)?.trim() || '';
    if (input === '') {
      console.log(
        ShowMessage.message(
          '❌ Value cannot be empty. Try again!',
          'error',
          true
        )
      );
      continue;
    }

    num = Number(input);
    if (isNaN(num)) {
      console.log(
        ShowMessage.message(
          '❌ Only numeric values are accepted. Try again!',
          'error',
          true
        )
      );
      continue;
    }
    break;
  }
  return num;
}

export function isPositiveNumberPrompt(message: string): number {
  let input: string;
  let num: number;
  while (true) {
    input = prompt(message)?.trim() || '';
    if (input === '') {
      console.log(
        ShowMessage.message(
          '❌ Value cannot be empty. Try again!',
          'error',
          true
        )
      );
      continue;
    }
    num = Number(input);
    if (isNaN(num)) {
      console.log(
        ShowMessage.message(
          '❌ Only numeric values are accepted. Try again!',
          'error',
          true
        )
      );
      continue;
    }
    if (num <= 0) {
      console.log(
        ShowMessage.message(
          '❌ The number must be greater than zero. Try again!',
          'error',
          true
        )
      );
      continue;
    }
    break;
  }
  return num;
}

export function isValidEmailPrompt(message: string): string {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  while (true) {
    const input: string = prompt(message)?.trim() || '';

    if (input === '') {
      console.log(
        ShowMessage.message(
          '❌ Email cannot be empty. Try again!',
          'error',
          true
        )
      );
      continue;
    }

    if (!emailRegex.test(input)) {
      console.log(
        ShowMessage.message(
          '❌ The email is not valid. Try again!',
          'error',
          true
        )
      );
      continue;
    }

    return input;
  }
}

export function isValidDatePrompt(message: string): string {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  while (true) {
    const input: string = prompt(message)?.trim() || '';

    if (input === '') {
      console.log(
        ShowMessage.message(
          '❌ Date cannot be empty. Try again!',
          'error',
          true
        )
      );
      continue;
    }

    if (!dateRegex.test(input)) {
      console.log(
        ShowMessage.message('❌ Invalid format. Use YYYY-MM-DD.', 'error', true)
      );
      continue;
    }

    const [year, month, day] = input.split('-').map(Number);

    const isValid = (y: number, m: number, d: number): boolean => {
      const date = new Date(y, m - 1, d); // JS: month is 0-based
      return (
        date.getFullYear() === y &&
        date.getMonth() === m - 1 &&
        date.getDate() === d
      );
    };

    if (!isValid(year, month, day)) {
      console.log(
        ShowMessage.message(
          '❌ The date is not valid. Try again!',
          'error',
          true
        )
      );
      continue;
    }

    return input;
  }
}

export function isValidDate(value: string): boolean {
  if (value.trim() === '') return false;

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(value)) return false;

  const date = new Date(value);
  return !isNaN(date.getTime());
}

export function promptNonEmptyString(message: string): string {
  let input: string = '';

  do {
    input = prompt(message).trim();

    if (input.length === 0) {
      console.log(
        ShowMessage.message(
          '❌ Name cannot be empty. Try again!',
          'error',
          true
        )
      );
    }
  } while (input.length === 0);

  return input;
}
