import { EnvironmentConfig } from '../interfaces/environments.interface';

export const increasedPercentage: number = 38;
export const EnvironmentsMySQL: EnvironmentConfig = {
  increasedPercentage: 38,
  databaseHostname: 'localhost',
  databaseUsername: 'mario',
  databasePassword: 'password-mario',
  databaseName: 'supermarket',
  databasePort: 3306
};

export const EnvironmentsPostgreSQL: EnvironmentConfig = {
  increasedPercentage: 38,
  databaseHostname: 'localhost',
  databaseUsername: 'postgres',
  databasePassword: 'password-postgresql',
  databaseName: 'supermarket',
  databasePort: 5432
};

export const EnvironmentsSQLServer: EnvironmentConfig = {
  increasedPercentage: 38,
  databaseHostname: 'localhost',
  databaseUsername: 'mario',
  databasePassword: 'password-sqlmario',
  databaseName: 'supermarket',
  databasePort: 1433
};
