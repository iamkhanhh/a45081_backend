import { forwardRef, Global, Module } from '@nestjs/common';
import { PaginationProvider } from './providers/pagination.provider';
import { HashingPasswordProvider } from './providers/hashing-password.provider';
import { S3Provider } from './providers/s3.provider';
import { MongodbProvider } from './providers/mongodb.provider';
import { SampleImportProvider } from './providers/sample-import.provider';
import { Analysis } from '@/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonProvider } from './providers/common.provider';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Analysis]),
  ],
  providers: [
    PaginationProvider,
    HashingPasswordProvider,
    S3Provider,
    MongodbProvider,
    SampleImportProvider,
    CommonProvider
  ],
  exports: [
    PaginationProvider,
    HashingPasswordProvider,
    S3Provider,
    MongodbProvider,
    CommonProvider
  ]
})
export class CommonModule {}
