import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { WorkshopController } from '../controllers/workshop.controller';
import { UserEntity, WorkshopEntity } from '../entities';
import {
  WorkshopService,
  ConfigService,
  AuthService,
  UserService,
} from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([WorkshopEntity, UserEntity])],
  controllers: [WorkshopController],
  providers: [AuthService, UserService, WorkshopService, ConfigService],
  exports: [WorkshopService],
})
export class WorkshopModule {}
