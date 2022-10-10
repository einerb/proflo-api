import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { UserEntity } from 'src/entities/index';
import { UserRepository } from '../repositories/index';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: UserRepository,
  ) {}

  async getByIdentification(identification: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        identification: identification,
      },
    });
  }
}
