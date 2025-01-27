import { Global, Module } from '@nestjs/common';
import { PaginationProvider } from './providers/pagination.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analysis, GeneClinicalSynopsis, PatientInformation, Pipelines, Samples, Uploads, Users, Workspaces } from '../entities';
import { HashingPasswordProvider } from './providers/hashing-password.provider';
import { S3Provider } from './providers/s3.provider';

@Global()
@Module({
  // imports: [
  //   TypeOrmModule.forFeature([Analysis, GeneClinicalSynopsis, PatientInformation, Pipelines, Samples, Uploads, Users, Workspaces]),
  // ],
  providers: [
    PaginationProvider,
    HashingPasswordProvider,
    S3Provider
  ],
  exports: [
    PaginationProvider,
    HashingPasswordProvider,
    S3Provider
  ]
})
export class CommonModule {}
