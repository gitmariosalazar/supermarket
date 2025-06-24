import { EnvironmentsPostgreSQL } from './../../../settings/environments/environments';
import { Pool } from 'pg';
import { DatabaseAbstract } from '../../model/database.abstract.model';

export class DatabaseServicePostgreSQL extends DatabaseAbstract {
  private pool: Pool;

  constructor() {
    super();
    this.pool = new Pool({
      user: EnvironmentsPostgreSQL.databaseUsername,
      host: EnvironmentsPostgreSQL.databaseHostname,
      password: EnvironmentsPostgreSQL.databasePassword,
      database: EnvironmentsPostgreSQL.databaseName,
      port: EnvironmentsPostgreSQL.databasePort
    });
  }

  async onModuleInit() {
    await this.connect();
  }
  async onModuleDestroy() {
    await this.close();
  }

  public async connect(): Promise<void> {
    try {
      await this.pool.query('SELECT 1');
      console.log('🛢️ Connected to PostgreSQL successfully 🎉!');
    } catch (error) {
      console.error(`Failed to connect to PostgreSQL: ${error}`);
      throw new Error('Database connection failed');
    }
  }

  async query<T>(sql: string, params: any[] = []): Promise<T[]> {
    try {
      const result = await this.pool.query(sql, params);
      return result.rows;
    } catch (error) {
      console.error(`Database query failed: ${error}`);
      throw new Error('Database query failed');
    }
  }

  async close(): Promise<void> {
    try {
      await this.pool.end();
      console.log('Database connection closed successfully');
    } catch (error) {
      console.error(`Failed to close database connection`);
    }
  }
}
