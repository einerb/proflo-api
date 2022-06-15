import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';

import { PaginationVerifier, ServiceEntity, UserEntity } from 'src/entities';
import { CreateServiceDto } from 'src/entities/dto/create-service.dto';
import { Roles } from 'src/entities/enum/role.enum';
import { States } from 'src/entities/enum/state.enum';
import { UserRepository } from 'src/repositories';
import { ServiceRepository } from 'src/repositories/service.repository';
import { ApiResponse, ERROR, SUCCESS } from 'src/responses';
import { IPaginationWithDates } from 'src/entities/interfaces/pagination';
import { ApiResponseRecords } from 'src/responses/api.response';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceEntity)
    private serviceRepository: ServiceRepository,
    @InjectRepository(UserEntity)
    private userRepository: UserRepository,
  ) {}

  async findById(id: number): Promise<ApiResponse> {
    const service = await this.serviceRepository
      .createQueryBuilder('service')
      .leftJoinAndSelect('service.users', 'user')
      .leftJoinAndSelect('service.news', 'new')
      .where('service.id = :id', {
        id: id,
      })
      .getOne();

    if (!service) return new ApiResponse(false, ERROR.SERVICE_NOT_FOUND);

    return new ApiResponse(true, SUCCESS.SERVICE_FOUND, service);
  }

  async getAll(
    userDecode: any,
    pagination: IPaginationWithDates,
  ): Promise<ApiResponse> {
    if (userDecode.role === Roles.ROOT) {
      if (!PaginationVerifier.verifyIPagination(pagination))
        return ApiResponse.paginationWithDatesNotProvidedError();

      const result = await this.serviceRepository
        .createQueryBuilder('service')
        .leftJoinAndSelect('service.users', 'user')
        .leftJoinAndSelect('service.news', 'new')
        .where('service.created_at >= :start AND service.created_at <= :end', {
          start: pagination.start,
          end: pagination.end,
        })
        .skip(
          Math.max(0, (pagination.pageNumber - 1) * pagination.pageElements),
        )
        .take(pagination.pageElements)
        .orderBy('service.createdAt', 'DESC')
        .getManyAndCount();

      if (!result.length) new ApiResponse(false, ERROR.SERVICES_NOT_FOUND);

      return new ApiResponse(
        true,
        SUCCESS.SERVICES_FOUND,
        new ApiResponseRecords(result, pagination),
      );
    } else {
      return new ApiResponse(false, ERROR.REQUEST_UNAUTHORIZED);
    }
  }

  async validateStateService(user: number, state: any) {
    let data = await this.serviceRepository
      .createQueryBuilder('service')
      .where('service.usersId = :user AND service.state = :state', {
        user: user,
        state: state,
      })
      .getManyAndCount();

    return data[0].length;
  }

  async create(
    userDecode: any,
    id: number,
    dto: CreateServiceDto,
  ): Promise<ApiResponse> {
    if (userDecode.role !== Roles.USER) {
      const user = await this.userRepository.findOne({
        where: { id: id },
        relations: ['car'],
      });
      if (!user) return new ApiResponse(false, ERROR.USER_NOT_FOUND);
      if (!user.car?.id) return new ApiResponse(false, ERROR.HAS_CAR);

      const service = await this.serviceRepository.create(dto);
      service.users = <any>user.id;
      service.hash = <any>uuidv4();

      if (
        (await this.validateStateService(user.id, States.ACTIVE)) > 0 ||
        (await this.validateStateService(user.id, States.CREATED)) > 0
      ) {
        return new ApiResponse(false, ERROR.SERVICE_ACTIVE);
      } else {
        await service.save();

        return new ApiResponse(true, SUCCESS.SERVICE_CREATED, service);
      }
    } else {
      return new ApiResponse(false, ERROR.REQUEST_UNAUTHORIZED);
    }
  }

  async update(
    userDecode: any,
    id: number,
    dto: CreateServiceDto,
  ): Promise<ApiResponse> {
    if (userDecode.role !== Roles.USER) {
      const service = await this.serviceRepository.findOne({
        where: { id: id },
      });

      if (!service) return new ApiResponse(false, ERROR.SERVICE_NOT_FOUND);

      let serviceUpdated = await this.serviceRepository.update({ id: id }, dto);

      return new ApiResponse(true, SUCCESS.SERVICE_UPDATED, serviceUpdated);
    } else {
      return new ApiResponse(false, ERROR.REQUEST_UNAUTHORIZED);
    }
  }

  async completed(userDecode: any, id: number): Promise<ApiResponse> {
    if (userDecode.role !== Roles.USER) {
      const service = await this.serviceRepository.findOne({
        where: { id: id },
      });

      if (!service) return new ApiResponse(false, ERROR.SERVICE_NOT_FOUND);
      if (service.state === States.COMPLETED)
        return new ApiResponse(true, SUCCESS.SERVICE_COMPLETED_EXIST);

      await this.serviceRepository.update(
        { id: id },
        { state: States.COMPLETED },
      );

      return new ApiResponse(true, SUCCESS.SERVICE_COMPLETED);
    } else {
      return new ApiResponse(false, ERROR.REQUEST_UNAUTHORIZED);
    }
  }

  async delete(userDecode: any, id: number): Promise<any> {
    if (userDecode.role !== Roles.USER) {
      const user = await this.serviceRepository.findOne({
        where: { id: id },
      });

      if (!user) return new ApiResponse(false, ERROR.SERVICE_NOT_FOUND);

      this.serviceRepository
        .createQueryBuilder()
        .delete()
        .from(ServiceEntity)
        .where('id = :id', {
          id: id,
        })
        .execute();

      return new ApiResponse(true, SUCCESS.SERVICE_DELETED);
    } else {
      return new ApiResponse(false, ERROR.REQUEST_UNAUTHORIZED);
    }
  }
}
