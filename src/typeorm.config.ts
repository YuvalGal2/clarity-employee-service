import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { DataSource, DataSourceOptions, getMetadataArgsStorage } from 'typeorm';
import { config } from 'dotenv';
import * as process from 'process';
config(); // trick to make both the migration and the factory to work together.
const entities = getMetadataArgsStorage().tables.map((table) => table.target);

export const settings: DataSourceOptions = {
  type: process.env.DB_DRIVER as any,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_DATABASE_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD || '',
  synchronize: Boolean(process.env.DB_SYNCHRONIZE) || true,
  logging: Boolean(process.env.TYPEORM_LOGGING) || false,
  entities: ['dist/**/*.entity{.js}'],
  migrations: ['dist/migrations/*.js'],
};

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    const envConfig: any = Object.assign({}, settings);
    envConfig.entities = entities;
    return envConfig;
  },
};

console.log(settings);
const dataSource: DataSource = new DataSource(settings);
export default dataSource;
