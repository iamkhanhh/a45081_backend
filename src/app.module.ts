import { Module } from '@nestjs/common';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { UsersModule } from '@/modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from '@/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analysis, GeneClinicalSynopsis, PatientInformation, Pipelines, Samples, Uploads, Users, Workspaces } from './entities';
import { AuthGuard } from './auth/passport/auth.guard';
import { PipelinesModule } from './modules/pipelines/pipelines.module';
import { WorkspacesModule } from './modules/workspaces/workspaces.module';
import { AnalysisModule } from './modules/analysis/analysis.module';
import { PatientInformationModule } from './modules/patient-information/patient-information.module';
import { SamplesModule } from './modules/samples/samples.module';
import { UploadsModule } from './modules/uploads/uploads.module';

const ENV = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: '.env.' + ENV,
    }),
    AuthModule,
    PipelinesModule,
    WorkspacesModule,
    AnalysisModule,
    PatientInformationModule,
    SamplesModule,
    UploadsModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          // ignoreTLS: true,
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
          },
        },
        defaults: {
          from: '"No Reply" <no-reply@Genetics>',
        },
        preview: true,
        template: {
          dir: process.cwd() + '/src/mail/templates/',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        }
      }),
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABSE'),
        entities: [Analysis, GeneClinicalSynopsis, PatientInformation, Pipelines, Samples, Uploads, Users, Workspaces],
        synchronize: false,
      }),
      inject: [ConfigService],
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule { }