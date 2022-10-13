import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { ApiResponse, SUCCESS, ERROR } from '../responses';
import { UpdateEmployeeDto } from 'src/entities/dto/index';
import { ProjectEntity } from 'src/entities/index';
import { ProjectRepository } from '../repositories/index';
import { IPaginationDate } from 'src/entities/interfaces/pagination';
import { CreateProjectDto } from 'src/entities/dto/create-project.dto';

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

    return new ApiResponse(true, SUCCESS.PROJECT_FOUND, project);
  }

  async findById(
    name: string,
    pagination: IPaginationDate,
  ): Promise<ApiResponse> {
    const project = await this.projectRepository
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.schedule', 'schedule')
      .where(
        "LOWER(project.name) LIKE LOWER(:name) AND schedule.createdAt >= :start AND schedule.createdAt <= :end",
        {
          name: '%'+name+'%',
          start: pagination.start,
          end: pagination.end,
        },
      )
      .getOne();

    if (!project) return new ApiResponse(false, ERROR.PROJECT_NOT_FOUND);

    return new ApiResponse(true, SUCCESS.PROJECT_FOUND, project);
  }

  async create(dto: CreateProjectDto): Promise<ApiResponse> {
    if (
      await this.projectRepository.findOne({
        where: { name: dto.name },
      })
    )
      return new ApiResponse(false, ERROR.PROJECT_EXIST);

    let project = await this.projectRepository.create(dto);

    await this.projectRepository.save(project);

    return new ApiResponse(true, SUCCESS.PROJECT_CREATED, project);
  }

  async update(id: number, dto: UpdateEmployeeDto): Promise<ApiResponse> {
    const project = await this.projectRepository.findOne({
      where: { id: id },
    });

    if (!project) return new ApiResponse(false, ERROR.PROJECT_NOT_FOUND);

    await this.projectRepository.update({ id: id }, dto);

    return new ApiResponse(true, SUCCESS.EMPLOYEE_UPDATED);
  }

  async delete(id: number): Promise<any> {
    const project = await this.projectRepository.findOne({
      where: { id: id },
    });

    if (!project) return new ApiResponse(false, ERROR.PROJECT_NOT_FOUND);

    await this.projectRepository.save(project);
    this.projectRepository.softDelete({ id: id });

    return new ApiResponse(true, SUCCESS.PROJECT_DELETED);
  }
}
