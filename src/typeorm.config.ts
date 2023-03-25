import { DataSourceOptions } from 'typeorm';
import EmployeeEntity from './entities/employee.entity';
import { config } from 'dotenv';
import { CreateEmployeesTable1679767538379 } from '../migrations/1679767538379-CreateEmployeesTable';
import * as process from 'process';
config();

export default () => {
  config();
  console.log(process.env);
  return {
    type: process.env.DB_DRIVER as any,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_DATABASE_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD || '',
    entities: [EmployeeEntity],
    multipleStatements: true,
    migrations: [CreateEmployeesTable1679767538379],
  } as DataSourceOptions;
};
