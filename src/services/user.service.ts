import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { ApiResponse, SUCCESS, ERROR } from '../responses';
import { CreateUserDto, UpdateUserDto } from 'src/entities/dto/index';
import {
  WorkshopEntity,
  UserEntity,
  PaginationVerifier,
} from 'src/entities/index';
import { UserRepository, WorkshopRepository } from '../repositories/index';
import { Roles } from 'src/entities/enum/role.enum';
import { IPaginationWithDates } from 'src/entities/interfaces/pagination';
import { ApiResponseRecords } from 'src/responses/api.response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: UserRepository,

    @InjectRepository(WorkshopEntity)
    private workshopRepository: WorkshopRepository,
  ) {}

  permissionRoles(role, user) {
    let root = [1, 2, 3];
    let admin = [2, 3];
    let client = [3];

    if (user === Roles.ROOT && root.includes(role)) {
      return true;
    } else if (user === Roles.ADMIN && admin.includes(role)) {
      return true;
    } else if (user === Roles.USER && client.includes(role)) {
      return true;
    }

    return false;
  }

  async findById(
    userDecode: any,
    identification: number,
  ): Promise<ApiResponse> {
    let role;
    const preUser = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.identification = :identification AND user.state = true', {
        identification: identification,
      })
      .getOne();

    switch (userDecode.role) {
      case Roles.ROOT:
        role = 0;
        break;
      case Roles.ADMIN:
        role = 2;
        break;
      default:
        role = 3;
    }

    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .leftJoinAndSelect('user.car', 'car')
      .leftJoinAndSelect('user.licenses', 'licenses')
      .leftJoinAndSelect('user.services', 'services')
      .where(
        'user.identification = :identification AND user.state = true AND user.role_id >= :role',
        {
          identification: identification,
          role: role,
        },
      )
      .getMany();

    if (!preUser) return new ApiResponse(false, ERROR.USER_NOT_FOUND);

    if (!this.permissionRoles(preUser.role.id, userDecode.role))
      return new ApiResponse(false, ERROR.REQUEST_UNAUTHORIZED);

    return new ApiResponse(true, SUCCESS.USER_FOUND, user);
  }

  async getByIdentification(identification: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        identification: identification,
      },
    });
  }

  async getByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.email = :email', { email: email })
      .getOne();
  }

  async ifExistById(identification: number): Promise<Boolean> {
    const user = await this.userRepository.findOne({
      where: {
        identification: identification,
      },
    });

    return user ? true : false;
  }

  async ifExistByEmail(email: string): Promise<Boolean> {
    const user = await this.userRepository.findOne({
      where: { email: email },
    });

    return user ? true : false;
  }

  async create(userDecode: any, dto: CreateUserDto): Promise<ApiResponse> {
    const workshop = await this.workshopRepository.findOne({
      where: { id: dto.workshopId },
    });
    const userLimit = await this.workshopRepository
      .createQueryBuilder('workshop')
      .select('workshop.id')
      .loadRelationCountAndMap('workshop.limit', 'workshop.users')
      .where('workshop.id = :id AND workshop.state = true', {
        id: dto.workshopId,
      })
      .getMany();

    if (!workshop) return new ApiResponse(false, ERROR.WORKSHOP_NOT_FOUND);

    if (await this.ifExistById(dto.identification))
      return new ApiResponse(false, ERROR.USER_EXIST);

    if (await this.ifExistByEmail(dto.email))
      return new ApiResponse(false, ERROR.EMAIL_EXIST);

    let roleAllow;
    if (userDecode.role === Roles.ROOT) {
      roleAllow = dto.role_id > 0;
    } else if (userDecode.role === Roles.ADMIN) {
      roleAllow = dto.role_id >= 2;
    } else {
      return new ApiResponse(false, ERROR.REQUEST_UNAUTHORIZED);
    }

    let role;
    if (roleAllow) {
      role = dto.role_id;
    } else {
      return new ApiResponse(false, ERROR.REQUEST_UNAUTHORIZED);
    }

    if (!workshop && userDecode.role !== Roles.ROOT) {
      return new ApiResponse(false, ERROR.REQUEST_UNAUTHORIZED);
    } else {
      if (userLimit[0]?.limit >= workshop.limit_users) {
        return new ApiResponse(false, ERROR.WORKSHOP_ADMIN_LIMIT);
      } else {
        let user = await this.userRepository.create(dto);
        user.role = <any>role;
        user = await this.userRepository.save(user);
        user.workshops = [workshop];
        await this.userRepository.save(user);

        return new ApiResponse(true, SUCCESS.USER_CREATED);
      }
    }
  }

  async createTest(dto: CreateUserDto): Promise<ApiResponse> {
    let user = await this.userRepository.create(dto);
    user.role = <any>1;
    user = await this.userRepository.save(user);

    return new ApiResponse(true, SUCCESS.USER_CREATED);
  }

  async update(
    identification: number,
    dto: UpdateUserDto,
  ): Promise<ApiResponse> {
    const user = await this.userRepository.findOne({
      where: { identification: identification },
    });

    if (!user) return new ApiResponse(false, ERROR.USER_NOT_FOUND);

    await this.userRepository.update({ identification: identification }, dto);

    return new ApiResponse(true, SUCCESS.USER_UPDATED);
  }

  async delete(userDecode: any, id: number): Promise<any> {
    if (userDecode.role === Roles.ROOT || userDecode.role === Roles.ADMIN) {
      const user = await this.userRepository.findOne({
        where: { id: id },
      });

      if (!user) return new ApiResponse(false, ERROR.USER_NOT_FOUND);

      this.userRepository
        .createQueryBuilder()
        .delete()
        .from(UserEntity)
        .where('id = :id', {
          id: id,
        })
        .execute();

      return new ApiResponse(true, SUCCESS.USER_DELETED);
    } else {
      return new ApiResponse(false, ERROR.REQUEST_UNAUTHORIZED);
    }
  }
}
