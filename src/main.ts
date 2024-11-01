import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.use(cookieParser());

  app.use(cors({
    origin: 'http://localhost:4200', 
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true, 
  }));

  app.setGlobalPrefix('api/v1', { exclude: [''] });

  await app.listen(port);
}
bootstrap();
