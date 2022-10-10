import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { ApiResponse, SUCCESS, ERROR } from '../responses';
import {
  EmployeeEntity,
  PaginationVerifier,
  ProjectEntity,
  ScheduleEntity,
} from 'src/entities/index';
import { IPaginationWithDates } from 'src/entities/interfaces/pagination';
import { ApiResponseRecords } from 'src/responses/api.response';
import { ScheduleRepository } from 'src/repositories/schedule.repository';
import { CreateScheduleDto } from 'src/entities/dto/create-schedule.dto';
import { EmployeeRepository, ProjectRepository } from 'src/repositories';
import { UpdateScheduleDto } from 'src/entities/dto/update-schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(ScheduleEntity)
    private scheduleRepository: ScheduleRepository,
    @InjectRepository(EmployeeEntity)
    private employeeRepository: EmployeeRepository,
    @InjectRepository(ProjectEntity)
    private projectRepository: ProjectRepository,
  ) {}

  async find(pagination: IPaginationWithDates): Promise<ApiResponse> {
    if (!PaginationVerifier.verifyIPagination(pagination))
      return ApiResponse.paginationWithDatesNotProvidedError();

    const schedule = await this.scheduleRepository
      .createQueryBuilder('schedule')
      .leftJoinAndSelect('schedule.employee', 'employee')
      .leftJoinAndSelect('schedule.project', 'project')
      .where('schedule.createdAt >= :start AND schedule.createdAt <= :end', {
        start: pagination.start,
        end: pagination.end,
      })
      .skip(Math.max(0, (pagination.pageNumber - 1) * pagination.pageElements))
      .take(pagination.pageElements)
      .orderBy('schedule.createdAt', 'DESC')
      .getManyAndCount();

    if (!schedule.length)
      return new ApiResponse(false, ERROR.SCHEDULE_NOT_FOUND);

    return new ApiResponse(
      true,
      SUCCESS.SCHEDULE_FOUND,
      new ApiResponseRecords(schedule, pagination),
    );
  }

  async create(dto: CreateScheduleDto): Promise<ApiResponse> {
    const employee = await this.employeeRepository.findOne({
      where: {
        identification: dto.identification,
      },
    });
    const project = await this.projectRepository.findOne({
      where: { id: dto.projectId },
    });

    if (!employee) return new ApiResponse(false, ERROR.EMPLOYEE_NOT_FOUND);
    if (!project) return new ApiResponse(false, ERROR.PROJECT_NOT_FOUND);

    let schedule = await this.scheduleRepository.create(dto);
    schedule.employee = <any>employee.id;
    schedule.project = <any>dto.projectId;

    await this.scheduleRepository.save(schedule);

    return new ApiResponse(true, SUCCESS.SCHEDULE_CREATED, schedule);
  }

  async update(id: number, dto: UpdateScheduleDto): Promise<ApiResponse> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: id },
    });

    const employee = await this.employeeRepository.findOne({
      where: {
        id: dto.employeeId,
      },
    });

    const project = await this.projectRepository.findOne({
      where: { id: dto.projectId },
    });

    if (!schedule) return new ApiResponse(false, ERROR.SCHEDULE_NOT_FOUND);
    if (!employee) return new ApiResponse(false, ERROR.EMPLOYEE_NOT_FOUND);
    if (!project) return new ApiResponse(false, ERROR.PROJECT_NOT_FOUND);

    await this.scheduleRepository.update(id, {
      hour: dto.hour,
      journey: dto.journey,
      employee: <any>dto.employeeId,
      project: <any>dto.projectId,
    });

    return new ApiResponse(true, SUCCESS.SCHEDULE_UPDATED);
  }

  async delete(id: number): Promise<any> {
    const schedule = await this.scheduleRepository.findOne({
      where: { id: id },
    });

    if (!schedule) return new ApiResponse(false, ERROR.SCHEDULE_NOT_FOUND);

    await this.scheduleRepository.save(schedule);
    this.scheduleRepository.softDelete({ id: id });

    return new ApiResponse(true, SUCCESS.SCHEDULE_DELETED);
  }
}
