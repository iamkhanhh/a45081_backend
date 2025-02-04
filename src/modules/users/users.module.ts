import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '@/entities';
import { CommonModule } from '@/common/common.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    CommonModule
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule { }
