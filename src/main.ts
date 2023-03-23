import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const isProd = process.env['ENV'].toUpperCase() === 'PROD';
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: isProd, // in prod it should be true
    }),
  );
  await app.listen(8000);
}
bootstrap();
