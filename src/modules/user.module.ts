import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'src/services/config.service';

import { UserController } from '../controllers/user.controller';
import { UserEntity, RoleEntity, WorkshopEntity, ServiceEntity, CarEntity } from '../entities/';
import { AuthService, UserService } from '../services/';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity, WorkshopEntity, ServiceEntity, CarEntity])],
  controllers: [UserController],
  providers: [AuthService, UserService, ConfigService],
  exports: [UserService],
})
export class UserModule {}
