import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'src/services/config.service';

import { UserEntity } from '../entities/';
import { AuthService, UserService } from '../services/';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [],
  providers: [UserService, ConfigService],
  exports: [UserService],
})
export class UserModule {}
