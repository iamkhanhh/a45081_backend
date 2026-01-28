import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'aws-sdk';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true
      }
    }),
  );

  app.use(cookieParser());

  app.use(cors({
    origin: configService.get<string>('ALLOWED_ORIGINS')?.split(',') || 'http://localhost:4200',
    // origin: 'http://localhost:4200', 
    // origin: '*', 
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
    credentials: true, 
  }));

  const configDocument = new DocumentBuilder()
    .setTitle('Genetics API')
    .setDescription('The Genetics API based on NestJS')
    .setTermsOfService('http://localhost:3000/terms-of-service')
    .addServer('http://localhost:3000')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, configDocument);
  SwaggerModule.setup('api', app, documentFactory);

  // app.setGlobalPrefix('api/v1', { exclude: [''] });
  config.update({
    credentials: {
      accessKeyId: configService.get<string>('AWS_ACCESS_KEY'),
      secretAccessKey: configService.get<string>('AWS_SECRET_KEY'),
    },
    region: configService.get<string>('AWS_REGION'),
  });

  await app.listen(port);
}
bootstrap();
