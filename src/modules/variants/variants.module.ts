import { Module } from '@nestjs/common';
import { VariantsService } from './variants.service';
import { VariantsController } from './variants.controller';
import { GeneClinicalSynopsis } from '@/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([GeneClinicalSynopsis]),
  ],
  controllers: [VariantsController],
  providers: [VariantsService],
})
export class VariantsModule {}
