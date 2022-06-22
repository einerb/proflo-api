import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NewController } from 'src/controllers/new.controller';
import {
  NewEntity,
  NotificationEntity,
  ServiceEntity,
  UserEntity,
} from 'src/entities';
import { NotificationService } from 'src/services';
import { NewService } from 'src/services/new.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NewEntity,
      ServiceEntity,
      UserEntity,
      NotificationEntity,
    ]),
  ],
  controllers: [NewController],
  providers: [NewService, NotificationService],
  exports: [NewService],
})
export class NewModule {}
