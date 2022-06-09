import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarController } from 'src/controllers/car.controller';
import { RoleEntity, UserEntity, WorkshopEntity } from 'src/entities';
import { CarEntity } from 'src/entities/car.entity';
import {
  AuthService,
  CarService,
  ConfigService,
  UserService,
} from 'src/services/';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CarEntity,
      UserEntity,
      RoleEntity,
      WorkshopEntity,
    ]),
  ],
  controllers: [CarController],
  providers: [AuthService, CarService, UserService, ConfigService],
  exports: [CarService],
})
export class CarModule {}
