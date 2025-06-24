import { EnvironmentsMySQL } from './../../../settings/environments/environments';
import * as mysql from 'mysql2';
import { DatabaseAbstract } from '../../model/database.abstract.model';

export class DatabaseServiceMySQL extends DatabaseAbstract {
  private connection: mysql.Connection;

  constructor() {
    super();
    this.connection = mysql.createConnection({
      host: EnvironmentsMySQL.databaseHostname,
      user: EnvironmentsMySQL.databaseUsername,
      database: EnvironmentsMySQL.databaseName,
      password: EnvironmentsMySQL.databasePassword,
      port: EnvironmentsMySQL.databasePort
    });
  }

  async onModuleInit() {
    await this.connectToMySQL();
  }

  async onModuleDestroy() {
    await this.close();
  }

  private async connectToMySQL(): Promise<void> {
    try {
      await new Promise((resolve, reject) => {
        this.connection.connect((err) => {
          if (err) {
            reject(err);
          } else {
            console.log(`🛢️  Connected to MySQL successfully 🎉!`);
            resolve(true);
          }
        });
      });
    } catch (error) {
      console.error(`Failed to connect to MySQL`);
      throw new Error('Database connection failed---');
    }
  }

  async query<T>(sql: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, params, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  async close(): Promise<void> {
    try {
      await new Promise((resolve, reject) => {
        this.connection.end((err) => {
          if (err) {
            reject(err);
          } else {
            console.log('MySQL connection closed successfully');
            resolve(true);
          }
        });
      });
    } catch (error) {
      console.error(`Failed to close MySQL connection`);
    }
  }
}
