import { Module } from '@nestjs/common';
import { SamplesService } from './samples.service';
import { SamplesController } from './samples.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Samples } from '@/entities';
import { CommonModule } from '@/common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Samples]),
    CommonModule
  ],
  controllers: [SamplesController],
  providers: [SamplesService],
})
export class SamplesModule {}
