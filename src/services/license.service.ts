import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { LicenseEntity, UserEntity } from 'src/entities';
import { CreateLicenseDto } from 'src/entities/dto/create-license.dto';
import { Roles } from 'src/entities/enum/role.enum';
import { UserRepository } from 'src/repositories';
import { LicenseRepository } from 'src/repositories/license.repository';
import { ApiResponse, ERROR, SUCCESS } from 'src/responses';

@Injectable()
export class LicenseService {
  constructor(
    @InjectRepository(LicenseEntity)
    private licenseRepository: LicenseRepository,
    @InjectRepository(UserEntity)
    private userRepository: UserRepository,
  ) {}

  async create(
    userDecode: any,
    id: number,
    dto: CreateLicenseDto,
  ): Promise<ApiResponse> {
    if (userDecode.role !== Roles.USER) {
      const user = await this.userRepository.findOne({
        where: { id: id },
      });
      if (!user) return new ApiResponse(false, ERROR.USER_NOT_FOUND);

      const licenseExist = await this.licenseRepository
        .createQueryBuilder('license')
        .where('license.usersId = :id AND license.category = :category', {
          id: id,
          category: dto.category,
        })
        .getMany();

      if (licenseExist.length > 0)
        return new ApiResponse(false, ERROR.LICENSE_EXIST);

      const license = await this.licenseRepository.create(dto);
      license.users = <any>user.id;
      await license.save();

      return new ApiResponse(true, SUCCESS.LICENSE_CREATED, license);
    } else {
      return new ApiResponse(false, ERROR.REQUEST_UNAUTHORIZED);
    }
  }

  async update(
    userDecode: any,
    id: number,
    dto: CreateLicenseDto,
  ): Promise<ApiResponse> {
    if (userDecode.role !== Roles.USER) {
      const license = await this.licenseRepository.findOne({
        where: { id: id },
      });

      if (!license) return new ApiResponse(false, ERROR.LICENSE_NOT_FOUND);

      let licenseUpdated = await this.licenseRepository.update({ id: id }, dto);

      return new ApiResponse(true, SUCCESS.LICENSE_UPDATED, licenseUpdated);
    } else {
      return new ApiResponse(false, ERROR.REQUEST_UNAUTHORIZED);
    }
  }

  async delete(userDecode: any, id: number): Promise<any> {
    if (userDecode.role !== Roles.USER) {
      const license = await this.licenseRepository.findOne({
        where: { id: id },
      });

      if (!license) return new ApiResponse(false, ERROR.LICENSE_NOT_FOUND);

      this.licenseRepository
        .createQueryBuilder()
        .delete()
        .from(LicenseEntity)
        .where('id = :id', {
          id: id,
        })
        .execute();

      return new ApiResponse(true, SUCCESS.LICENSE_DELETED);
    } else {
      return new ApiResponse(false, ERROR.REQUEST_UNAUTHORIZED);
    }
  }
}
