import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { WorkshopEntity } from 'src/entities';
import { WorkshopRepository } from 'src/repositories/wokshop.repository';
import { ApiResponse, SUCCESS, ERROR } from '../responses';
import { ApiResponseRecords } from 'src/responses/api.response';
import { CreateWorkshopDto, NitWorkshopDto } from 'src/entities/dto/index';
import { IPaginationWithDates } from 'src/entities/interfaces/pagination';
import { PaginationVerifier } from 'src/entities/pagination';
import { Roles } from 'src/entities/enum/role.enum';
import { UpdateWorkshopDto } from 'src/entities/dto/update-workshop.dto';

@Injectable()
export class WorkshopService {
  constructor(
    @InjectRepository(WorkshopEntity)
    private workshopRepository: WorkshopRepository,
  ) {}

  async getAll(
    userDecode: any,
    pagination: IPaginationWithDates,
  ): Promise<ApiResponse> {
    if (userDecode.role === Roles.ROOT) {
      if (!PaginationVerifier.verifyIPagination(pagination))
        return ApiResponse.paginationWithDatesNotProvidedError();

      const result = await this.workshopRepository
        .createQueryBuilder('workshop')
        .leftJoinAndSelect('workshop.users', 'user')
        .leftJoinAndSelect('user.licenses', 'licenses')
        .leftJoinAndSelect('user.car', 'car')
        .where(
          'workshop.created_at >= :start AND workshop.created_at <= :end AND workshop.state = true',
          {
            start: pagination.start,
            end: pagination.end,
          },
        )
        .skip(
          Math.max(0, (pagination.pageNumber - 1) * pagination.pageElements),
        )
        .take(pagination.pageElements)
        .orderBy('user.createdAt', 'DESC')
        .getManyAndCount();

      if (!result.length) new ApiResponse(false, ERROR.WORKSHOPS_NOT_FOUND);

      return new ApiResponse(
        true,
        SUCCESS.WORKSHOPS_FOUND,
        new ApiResponseRecords(result, pagination),
      );
    } else {
      return new ApiResponse(false, ERROR.REQUEST_UNAUTHORIZED);
    }
  }

  async findById(userDecode: any, dto: NitWorkshopDto): Promise<ApiResponse> {
    if (
      userDecode.role.role === Roles.ROOT ||
      userDecode.role.role === Roles.ADMIN ||
      userDecode.role.role === Roles.USER
    ) {
      let workshop;
      if (dto.nit.length > 0) {
        workshop = await this.workshopRepository
          .createQueryBuilder('workshop')
          .leftJoinAndSelect('workshop.users', 'user')
          .loadRelationCountAndMap('workshop.limit', 'workshop.users')
          .where('workshop.nit = :nit AND workshop.state = true', {
            nit: dto.nit,
          })
          .getOne();
      } else {
        workshop = await this.workshopRepository
          .createQueryBuilder('workshop')
          .leftJoinAndSelect('workshop.users', 'user')
          .loadRelationCountAndMap('workshop.limit', 'workshop.users')
          .where('workshop.state = true AND user.id = :id', {
            id: userDecode.id,
          })
          .getOne();
      }

      if (!workshop) return new ApiResponse(false, ERROR.WORKSHOP_NOT_FOUND);

      return new ApiResponse(true, SUCCESS.WORKSHOP_FOUND, workshop);
    }
  }

  async findByIdRole(
    userDecode: any,
    nit: string,
    role: string,
  ): Promise<ApiResponse> {
    if (
      userDecode.role.role === Roles.ADMIN ||
      userDecode.role.role === Roles.ROOT
    ) {
      const workshopFound = await this.workshopRepository
        .createQueryBuilder('workshop')
        .leftJoinAndSelect('workshop.users', 'user')
        .loadRelationCountAndMap('workshop.limit', 'workshop.users')
        .where('workshop.nit = :nit AND workshop.state = true', {
          nit: nit,
        })
        .getOne();
      if (!workshopFound)
        return new ApiResponse(false, ERROR.WORKSHOP_NOT_FOUND);

      const workshop = await this.workshopRepository
        .createQueryBuilder('workshop')
        .leftJoinAndSelect('workshop.users', 'user')
        .loadRelationCountAndMap('workshop.limit', 'workshop.users')
        .where(
          'workshop.nit = :nit AND workshop.state = true AND user.role = :role',
          {
            nit: nit,
            role: role,
          },
        )
        .getOne();

      if (!workshop) return new ApiResponse(false, ERROR.WORKSHOP_NO_USERS);

      return new ApiResponse(true, SUCCESS.WORKSHOP_FOUND, workshop);
    }
  }

  async create(userDecode: any, dto: CreateWorkshopDto): Promise<ApiResponse> {
    if (userDecode.role === Roles.ROOT) {
      if (
        await this.workshopRepository.findOne({
          where: { nit: dto.nit },
        })
      )
        return new ApiResponse(false, ERROR.WORKSHOP_FOUND);

      const workshop = await this.workshopRepository.create(dto);

      await workshop.save();

      return new ApiResponse(true, SUCCESS.WORKSHOP_CREATED, { workshop });
    } else {
      return new ApiResponse(false, ERROR.REQUEST_UNAUTHORIZED);
    }
  }

  async update(
    userDecode: any,
    nit: string,
    dto: UpdateWorkshopDto,
  ): Promise<ApiResponse> {
    if (userDecode.role.role === Roles.ROOT) {
      const workshop = await this.workshopRepository
        .createQueryBuilder('workshop')
        .leftJoinAndSelect('workshop.users', 'user')
        .loadRelationCountAndMap('workshop.limit', 'workshop.users')
        .where('workshop.nit = :nit', {
          nit: nit,
        })
        .getOne();

      if (!workshop) return new ApiResponse(false, ERROR.WORKSHOP_NOT_FOUND);
    }

    if (userDecode.role.role === Roles.ADMIN) {
      const workshopOther = await this.workshopRepository
        .createQueryBuilder('workshop')
        .leftJoinAndSelect('workshop.users', 'user')
        .loadRelationCountAndMap('workshop.limit', 'workshop.users')
        .where('workshop.nit = :nit AND user.id = :id', {
          nit: nit,
          id: userDecode.id,
        })
        .getOne();

      if (!workshopOther)
        return new ApiResponse(false, ERROR.WORKSHOP_NOT_FOUND);
    }

    await this.workshopRepository.update({ nit: nit }, dto);

    return new ApiResponse(true, SUCCESS.WORKSHOP_UPDATED);
  }

  async delete(userDecode: any, id: number): Promise<any> {
    if (userDecode.role === Roles.ROOT) {
      const workshop = await this.workshopRepository
        .createQueryBuilder('workshop')
        .leftJoinAndSelect('workshop.users', 'user')
        .loadRelationCountAndMap('workshop.limit', 'workshop.users')
        .where('workshop.id = :id', {
          id: id,
        })
        .getOne();

      if (!workshop) return new ApiResponse(false, ERROR.WORKSHOP_NOT_FOUND);

      if (workshop.limit > 0) {
        return new ApiResponse(false, ERROR.WORKSHOP_USERS_COUNT);
      } else {
        this.workshopRepository.softDelete({ id: id });

        return new ApiResponse(true, SUCCESS.WORKSHOP_DELETED);
      }
    } else {
      return new ApiResponse(false, ERROR.REQUEST_UNAUTHORIZED);
    }
  }
}
