import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Samples, Workspaces, Analysis } from '@/entities';
import { PipelinesModule } from '../pipelines/pipelines.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Samples, Workspaces, Analysis]),
    PipelinesModule,
  ],
  controllers: [SearchController],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
