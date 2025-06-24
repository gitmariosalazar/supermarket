export abstract class DatabaseAbstract {
  private hostname: string;
  private username: string;
  private port: number;
  private password: string;
  private database: string;

  constructor();
  constructor(
    hostname: string,
    username: string,
    port: number,
    password: string,
    database: string
  );

  constructor(
    hostname?: string,
    username?: string,
    port?: number,
    password?: string,
    database?: string
  ) {
    this.hostname = hostname ?? '';
    this.username = username ?? '';
    this.port = port ?? 3306;
    this.password = password ?? '';
    this.database = database ?? '';
  }

  abstract query<T>(sql: string, params: any[]): Promise<T[]>;

  public getHostname(): string {
    return this.hostname;
  }

  public setHostname(hostname: string): void {
    this.hostname = hostname;
  }

  public getUsername(): string {
    return this.username;
  }

  public setUsername(username: string): void {
    this.username = username;
  }

  public getPort(): number {
    return this.port;
  }

  public setPort(port: number): void {
    this.port = port;
  }

  public getPassword(): string {
    return this.password;
  }

  public setPassword(password: string): void {
    this.password = password;
  }

  public getDatabase(): string {
    return this.database;
  }

  public setDatabase(database: string): void {
    this.database = database;
  }
}
