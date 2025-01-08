import { Module } from '@nestjs/common';
import { PaginationProvider } from './providers/pagination.provider';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analysis, GeneClinicalSynopsis, PatientInformation, Pipelines, Samples, Uploads, Users, Workspaces } from '../entities';

@Module({
  // imports: [
  //   TypeOrmModule.forFeature([Analysis, GeneClinicalSynopsis, PatientInformation, Pipelines, Samples, Uploads, Users, Workspaces]),
  // ],
  providers: [
    PaginationProvider
  ],
  exports: [PaginationProvider]
})
export class CommonModule {}
