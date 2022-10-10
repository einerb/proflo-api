import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { ApiResponse, SUCCESS, ERROR } from '../responses';
import { CreateEmployeeDto, UpdateEmployeeDto } from 'src/entities/dto/index';
import { PaginationVerifier, ProjectEntity } from 'src/entities/index';
import { ProjectRepository } from '../repositories/index';
import { IPaginationWithDates } from 'src/entities/interfaces/pagination';
import { ApiResponseRecords } from 'src/responses/api.response';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectRepository: ProjectRepository,
  ) {}

  async find(): Promise<ApiResponse> {
    const project = await this.projectRepository
      .createQueryBuilder('project')
      .getMany();

    if (!project) return new ApiResponse(false, ERROR.EMPLOYEE_NOT_FOUND);

    return new ApiResponse(true, SUCCESS.EMPLOYEE_FOUND, project);
  }

  async findById(id: number): Promise<ApiResponse> {
    const project = await this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.schedules', 'schedules')
      .where('project.id = :id', {
        id: id,
      })
      .getOne();

    if (!project) return new ApiResponse(false, ERROR.EMPLOYEE_NOT_FOUND);

    return new ApiResponse(true, SUCCESS.EMPLOYEE_FOUND, project);
  }

  async create(dto: CreateEmployeeDto): Promise<ApiResponse> {
    let project = await this.projectRepository.create(dto);

    await this.projectRepository.save(project);

    return new ApiResponse(true, SUCCESS.EMPLOYEE_CREATED, project);
  }

  async update(id: number, dto: UpdateEmployeeDto): Promise<ApiResponse> {
    const project = await this.projectRepository.findOne({
      where: { id: id },
    });

    if (!project) return new ApiResponse(false, ERROR.EMPLOYEE_NOT_FOUND);

    await this.projectRepository.update({ id: id }, dto);

    return new ApiResponse(true, SUCCESS.EMPLOYEE_UPDATED);
  }

  async delete(id: number): Promise<any> {
    const project = await this.projectRepository.findOne({
      where: { id: id },
    });

    if (!project) return new ApiResponse(false, ERROR.EMPLOYEE_NOT_FOUND);

    await this.projectRepository.save(project);
    this.projectRepository.softDelete({ id: id });

    return new ApiResponse(true, SUCCESS.EMPLOYEE_DELETED);
  }
}
