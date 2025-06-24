import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export async function pause(
  prompt: string = 'Press Enter to continue...'
): Promise<void> {
  return new Promise((resolve) => {
    rl.question(prompt, () => resolve());
  });
}

export function closeReadline(): void {
  rl.close();
}
