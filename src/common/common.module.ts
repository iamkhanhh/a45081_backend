import { forwardRef, Global, Module } from '@nestjs/common';
import { PaginationProvider } from './providers/pagination.provider';
import { HashingPasswordProvider } from './providers/hashing-password.provider';
import { S3Provider } from './providers/s3.provider';
import { MongodbProvider } from './providers/mongodb.provider';
import { SampleImportProvider } from './providers/sample-import.provider';
import { Analysis } from '@/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonProvider } from './providers/common.provider';
import { AnalysisGateway } from './gateways/analysis.gateway';

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
    CommonProvider,
    AnalysisGateway
  ],
  exports: [
    PaginationProvider,
    HashingPasswordProvider,
    S3Provider,
    MongodbProvider,
    CommonProvider,
    AnalysisGateway
  ]
})
export class CommonModule {}
