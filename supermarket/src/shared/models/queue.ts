export class Queue<T> {
  private storage: T[];

  constructor() {
    this.storage = [];
  }

  size(): number {
    return this.storage.length;
  }

  isEmpty(): boolean {
    return this.storage.length === 0;
  }

  addToQueue(item: T): void {
    this.storage.push(item);
  }

  giveShift(): T | null {
    if (!this.isEmpty()) {
      return this.storage.shift()!;
    }
    return null;
  }

  nextShift(): T | null {
    if (!this.isEmpty()) {
      return this.storage[0];
    }
    return null;
  }

  values(): T[] {
    return Array.from(this.storage.values());
  }

  printQueue(): string {
    let resp: string = '';
    for (let index = 0; index < this.storage.length; index++) {
      resp +=
        'shift ' + index + ' -> ' + JSON.stringify(this.storage[index]) + '\n';
    }
    return resp;
  }
}

export class PriorityQueue<T> {
  queue: Map<number, Queue<T>>;
  constructor() {
    this.queue = new Map();
  }

  isEmpty(): boolean {
    return Array.from(this.queue.values()).every((queue) => queue.isEmpty());
  }
  /*
  getSortedQueueByPriority(): T[] {
    const sortedPriorities: number[] = Array.from(this.queue.keys()).sort(
      (a, b) => b - a
    );
    const sortedQueue: T[] = [];
    for (const priority of sortedPriorities) {
      const items: T[] = this.queue.get(priority)?.values()!;
      sortedQueue.push(...items);
    }
    return sortedQueue;
  }
*/
  getSortedQueueByPriority(): { turn: number; priority: number; data: T }[] {
    const sortedPriorities: number[] = Array.from(this.queue.keys()).sort(
      (a, b) => b - a
    );
    const sortedQueue: { turn: number; priority: number; data: T }[] = [];
    let turn: number = 0;
    for (const priority of sortedPriorities) {
      const items: T[] = [...(this.queue.get(priority)?.values() ?? [])];
      for (const item of items) {
        sortedQueue.push({ turn, priority, data: item });
        turn++;
      }
    }
    return sortedQueue;
  }

  giveShift(): T | null {
    const sortedPriorities = Array.from(this.queue.keys()).sort(
      (a, b) => b - a
    );
    for (const priority of sortedPriorities) {
      const queue = this.queue.get(priority)!;
      if (!queue.isEmpty()) {
        const item = queue.giveShift();
        if (queue.isEmpty()) {
          this.queue.delete(priority);
        }
        return item;
      }
    }
    return null;
  }

  nextShift(): T | null {
    const sortedPriorities = Array.from(this.queue.keys()).sort(
      (a, b) => b - a
    );
    for (const priority of sortedPriorities) {
      const queue = this.queue.get(priority)!;
      if (!queue.isEmpty()) {
        const item = queue.nextShift();
        if (queue.isEmpty()) {
          this.queue.delete(priority);
        }
        return item;
      }
    }
    return null;
  }

  addItemPriority(priority: number, item: T) {
    if (!this.queue.has(priority)) {
      this.queue.set(priority, new Queue<T>());
    }
    this.queue.get(priority)?.addToQueue(item);
  }
}
