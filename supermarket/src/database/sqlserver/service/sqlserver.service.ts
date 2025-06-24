import { EnvironmentsSQLServer } from './../../../settings/environments/environments';
import * as mssql from 'mssql';
import { DatabaseAbstract } from '../../model/database.abstract.model';

export class DatabaseServiceSQLServer extends DatabaseAbstract {
  private readonly poolPromise: Promise<mssql.ConnectionPool>;

  constructor() {
    super();
    const config: mssql.config = {
      user: EnvironmentsSQLServer.databaseUsername,
      password: EnvironmentsSQLServer.databasePassword,
      server: EnvironmentsSQLServer.databaseHostname,
      database: EnvironmentsSQLServer.databaseName,
      port: EnvironmentsSQLServer.databasePort,
      options: {
        encrypt: false,
        trustServerCertificate: true
      }
    };

    this.poolPromise = mssql
      .connect(config)
      .then((pool) => {
        console.log(`🛢️  Connected to SQL Server successfully 🎉!`);
        return pool;
      })
      .catch((error) => {
        console.error(`Failed to connect to SQL Server: ${error.message}`);
        throw error;
      });
  }

  async query<T>(sql: string, params?: Record<string, any>): Promise<T[]> {
    const pool = await this.poolPromise;
    const request = pool.request();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        request.input(key, value);
      });
    }

    const result = await request.query(sql);
    return result.recordset;
  }
}
