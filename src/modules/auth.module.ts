import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from '../controllers/auth.controller';
import { AuthService, ConfigService, UserService } from '../services/index';
import { JwtStrategy } from '../entities/strategies/jwt.strategy';
import { LocalStrategy } from '../entities/strategies/local.strategy';
import { UserModule } from './user.module';
import { UserEntity } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_ENCRYPTION,
      signOptions: { expiresIn: 86400 },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    ConfigService,
    UserService,
  ],
  exports: [AuthService, LocalStrategy, JwtStrategy, UserService],
})
export class AuthModule {}
