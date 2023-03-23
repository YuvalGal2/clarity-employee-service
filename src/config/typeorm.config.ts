import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { getMetadataArgsStorage } from 'typeorm';
export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],

  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    const entities = getMetadataArgsStorage().tables.map(
      (table) => table.target,
    );
    const envConfig = {
      type: process.env.DB_DRIVER as any,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD || '',
      synchronize: Boolean(process.env.DB_SYNCHRONIZE) || false,
      logging: Boolean(process.env.TYPEORM_LOGGING) || false,
      entities: entities,
    };
    return envConfig;
  },
};
