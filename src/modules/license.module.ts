import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LicenseController } from 'src/controllers/license.controller';
import { LicenseEntity } from '../entities/license.entity';
import {
  AuthService,
  LicenseService,
  UserService,
  ConfigService,
} from 'src/services';
import { UserEntity, WorkshopEntity } from 'src/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([LicenseEntity, UserEntity, WorkshopEntity]),
  ],
  controllers: [LicenseController],
  providers: [LicenseService, AuthService, UserService, ConfigService],
  exports: [LicenseService],
})
export class LicenseModule {}
