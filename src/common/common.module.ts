import { Global, Module } from '@nestjs/common';
import { PaginationProvider } from './providers/pagination.provider';
import { HashingPasswordProvider } from './providers/hashing-password.provider';
import { S3Provider } from './providers/s3.provider';
import { MongodbProvider } from './providers/mongodb.provider';

@Global()
@Module({
  // imports: [
  //   TypeOrmModule.forFeature([Analysis, GeneClinicalSynopsis, PatientInformation, Pipelines, Samples, Uploads, Users, Workspaces]),
  // ],
  providers: [
    PaginationProvider,
    HashingPasswordProvider,
    S3Provider,
    MongodbProvider
  ],
  exports: [
    PaginationProvider,
    HashingPasswordProvider,
    S3Provider,
    MongodbProvider
  ]
})
export class CommonModule {}
