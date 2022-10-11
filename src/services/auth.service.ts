import * as jwt from 'jsonwebtoken';
import { ConfigService } from '../services/config.service';
import { Injectable } from '@nestjs/common';

import { UserEntity } from 'src/entities';
import { UserService } from './user.service';
import { JwtPayload } from '../entities/interfaces/jwt-payload.interface';
import { ApiResponse, ERROR, SUCCESS } from 'src/responses';
import { Config } from 'src/entities/enum/config.enum';
import { CreateUserDto } from 'src/entities/dto';
import { UserRepository } from 'src/repositories';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
    @InjectRepository(UserEntity)
    private userRepository: UserRepository,
  ) {}

  async create(dto: CreateUserDto): Promise<ApiResponse> {
    if (await this.userService.getByIdentification(dto.identification))
      return new ApiResponse(false, ERROR.USER_EXIST);

    let user = await this.userRepository.create(dto);
    await this.userRepository.save(user);

    return new ApiResponse(true, SUCCESS.USER_CREATED, user.identification);
  }

  createToken(user: UserEntity) {
    const expiresIn = 86400;

    const accessToken = jwt.sign(
      {
        ...user,
      },
      this.configService.get(Config.JWT_ENCRYPTION),
      { expiresIn },
    );

    return new ApiResponse(true, SUCCESS.USER_LOGIN, {
      expiresIn,
      user: user.state,
      accessToken,
    });
  }

  async validateUserToken(payload: JwtPayload): Promise<UserEntity> {
    return await this.userService.getByIdentification(payload.identification);
  }

  async validateUser(identification: number, password: string): Promise<any> {
    const user = await this.userService.getByIdentification(identification);

    if (user && (await user.comparePassword(password))) {
      const { password, ...result } = user;

      return new ApiResponse(true, SUCCESS.USER_VALIDATE, result);
    }
    return null;
  }

  decodingJWT = (token) => {
    if (token !== null || token !== undefined) {
      const base64String = token.split('.')[1];
      const decodedValue = JSON.parse(
        Buffer.from(base64String, 'base64').toString('ascii'),
      );

      return decodedValue;
    }
    return null;
  };
}
