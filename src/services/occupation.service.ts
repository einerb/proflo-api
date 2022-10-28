import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { ApiResponse, SUCCESS, ERROR } from '../responses';
import { OccupationRepository } from 'src/repositories/occupation.repository';
import { OccupationEntity } from 'src/entities/occupation.entity';

@Injectable()
export class OccupationService {
  constructor(
    @InjectRepository(OccupationEntity)
    private occupationRepository: OccupationRepository,
  ) { }

  async find(): Promise<ApiResponse> {
    const occupation = await this.occupationRepository
      .createQueryBuilder('occupation')
      .getMany();

    if (!occupation) return new ApiResponse(false, ERROR.OCCUPATION_NOT_FOUND);

    return new ApiResponse(true, SUCCESS.OCCUPATION_FOUND, occupation);
  }
}
