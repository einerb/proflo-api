import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServiceController } from 'src/controllers/service.controller';
import {
  NewEntity,
  NotificationEntity,
  ServiceEntity,
  UserEntity,
  WorkshopEntity,
} from 'src/entities';
import {
  AuthService,
  ConfigService,
  NotificationService,
  UserService,
} from 'src/services';
import { ServiceService } from 'src/services/service.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ServiceEntity,
      UserEntity,
      NewEntity,
      WorkshopEntity,
      NotificationEntity,
    ]),
  ],
  controllers: [ServiceController],
  providers: [
    ServiceService,
    AuthService,
    UserService,
    ConfigService,
    NotificationService,
  ],
  exports: [ServiceService],
})
export class ServiceModule {}
