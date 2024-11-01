import { Module } from '@nestjs/common';
import { PipelinesService } from './pipelines.service';
import { PipelinesController } from './pipelines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pipelines } from '@/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pipelines])
  ],
  controllers: [PipelinesController],
  providers: [PipelinesService],
  exports: [PipelinesService]
})
export class PipelinesModule {}
