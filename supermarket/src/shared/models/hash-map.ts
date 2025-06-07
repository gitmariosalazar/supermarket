export class HashMap<K, V> {
  private table: Map<K, V>;

  constructor() {
    this.table = new Map();
  }

  isEmpty(): boolean {
    return this.table.size === 0;
  }

  size(): number {
    return this.table.size;
  }

  has(key: K): boolean {
    return this.table.has(key);
  }

  find(key: K): V | undefined {
    return this.table.get(key);
  }

  add(key: K, value: V): V | undefined {
    if (!this.table.has(key)) {
      this.table.set(key, value);
      return value;
    }
    return undefined;
  }

  update(key: K, value: V): V | undefined {
    if (this.find(key) !== undefined) {
      this.table.set(key, value);
      return value;
    }
    return undefined;
  }

  delete(key: K): boolean {
    return this.table.delete(key);
  }

  public getTable(): Map<K, V> {
    return this.table;
  }
}
