import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServiceController } from 'src/controllers/service.controller';
import {
  NewEntity,
  ServiceEntity,
  UserEntity,
  WorkshopEntity,
} from 'src/entities';
import { AuthService, ConfigService, UserService } from 'src/services';
import { ServiceService } from 'src/services/service.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ServiceEntity,
      UserEntity,
      NewEntity,
      WorkshopEntity,
    ]),
  ],
  controllers: [ServiceController],
  providers: [ServiceService, AuthService, UserService, ConfigService],
  exports: [ServiceService],
})
export class ServiceModule {}
