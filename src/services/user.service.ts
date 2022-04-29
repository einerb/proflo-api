import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { ApiResponse, SUCCESS, ERROR } from '../responses';
import { ApiResponseRecords } from 'src/responses/api.response';
import { CreateUserDto, UpdateUserDto } from 'src/entities/dto/index';
import { IPaginationWithDates } from 'src/entities/interfaces/pagination';
import { PaginationVerifier } from 'src/entities/pagination';
import { RoleEntity, UserEntity } from 'src/entities/index';
import { UpdatePasswordDto } from 'src/entities/dto/update-password.dto';
import { UserRepository, RoleRepository } from '../repositories/index';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private userRepository: UserRepository,
    @InjectRepository(RoleEntity) private roleRepository: RoleRepository,
  ) {}

  async getAll(
    identification: number,
    pagination: IPaginationWithDates,
  ): Promise<ApiResponse> {
    if (!PaginationVerifier.verifyIPagination(pagination))
      return ApiResponse.paginationWithDatesNotProvidedError();

    const result = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.rol', 'role')
      .leftJoinAndSelect('user.photo', 'photo')
      .where(
        'user.created_at >= :start AND user.created_at <= :end AND user.identification != :identification AND user.role_id = 1',
        {
          start: pagination.start,
          end: pagination.end,
          identification: identification,
        },
      )
      .skip(Math.max(0, (pagination.pageNumber - 1) * pagination.pageElements))
      .take(pagination.pageElements)
      .orderBy('user.createdAt', 'DESC')
      .getManyAndCount();

    if (!result.length) new ApiResponse(false, ERROR.USERS_NOT_FOUND);

    return new ApiResponse(
      true,
      SUCCESS.USERS_FOUND,
      new ApiResponseRecords(result, pagination),
    );
  }

  async findById(identification: number): Promise<ApiResponse> {
    const user = await this.userRepository.findOne({
      where: {
        identification: identification,
      },
    });

    if (!user) return new ApiResponse(false, ERROR.USER_NOT_FOUND);

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
      .leftJoinAndSelect('user.rol', 'role')
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

  async create(dto: CreateUserDto): Promise<ApiResponse> {
    if (await this.ifExistById(dto.identification))
      return new ApiResponse(false, ERROR.USER_EXIST);

    if (await this.ifExistByEmail(dto.email))
      return new ApiResponse(false, ERROR.EMAIL_EXIST);

    const role = await this.roleRepository.findOne({
      where: { id: dto.role_id },
    });
    if (!role) return new ApiResponse(false, ERROR.ROLE_NOT_FOUND);

    const user = await this.userRepository.create(dto);
    user.rol = <any>dto.role_id;
    await user.save();

    return new ApiResponse(true, SUCCESS.USER_CREATED);
  }

  removeExtensionFromFile(filename: string): string {
    const parts = filename.split('.');
    const ext = `.${parts[1]}`;
    const response = filename.replace(ext, '');
    return response;
  }

  async update(
    identification: number,
    dto: UpdateUserDto,
  ): Promise<ApiResponse> {
    const user = await this.userRepository.findOne({
      where: { identification: identification },
    });

    if (!user) return new ApiResponse(false, ERROR.USER_NOT_FOUND);

    const result = await this.userRepository.update(
      { identification: identification },
      dto,
    );

    return new ApiResponse(true, SUCCESS.USER_UPDATED, result);
  }

  async updatePassword(
    identification: number,
    password: UpdatePasswordDto,
  ): Promise<ApiResponse> {
    const user = await this.userRepository.findOne({
      where: { identification: identification },
    });

    if (!user) return new ApiResponse(false, ERROR.USER_NOT_FOUND);

    const result = await this.userRepository.update(
      { identification: identification },
      password,
    );

    return new ApiResponse(true, SUCCESS.PASSWORD_UPDATED, result);
  }

  async delete(id: number): Promise<any> {
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
  }
}
