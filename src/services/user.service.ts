import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { unlinkSync } from 'fs';

import { ApiResponse, SUCCESS, ERROR } from '../responses';
import { ApiResponseRecords } from 'src/responses/api.response';
import { PaginationVerifier } from 'src/entities/pagination';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class UserService {
  constructor() {}

  async getByIdentification(identification: number): Promise<any> {}

  async getByEmail(email: string): Promise<any> {}
}
