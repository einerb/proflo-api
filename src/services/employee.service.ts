import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { ApiResponse, SUCCESS, ERROR } from '../responses';
import { CreateEmployeeDto, UpdateEmployeeDto } from 'src/entities/dto/index';
import {
  PaginationVerifier,
  EmployeeEntity,
  ScheduleEntity,
} from 'src/entities/index';
import { EmployeeRepository } from '../repositories/index';
import { IPaginationWithDates } from 'src/entities/interfaces/pagination';
import { ApiResponseRecords } from 'src/responses/api.response';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(EmployeeEntity)
    private employeeRepository: EmployeeRepository,
  ) {}

  async find(): Promise<ApiResponse> {
    const employee = await this.employeeRepository
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.schedules', 'schedules')
      .getMany();

    if (!employee) return new ApiResponse(false, ERROR.EMPLOYEE_NOT_FOUND);

    return new ApiResponse(true, SUCCESS.EMPLOYEE_FOUND, employee);
  }

  async findById(
    identification: number,
    pagination: IPaginationWithDates,
  ): Promise<ApiResponse> {
    if (!PaginationVerifier.verifyIPagination(pagination))
      return ApiResponse.paginationWithDatesNotProvidedError();
    const employee = await this.employeeRepository
      .createQueryBuilder('employee')
      .leftJoinAndSelect('employee.schedules', 'schedules')
      .leftJoinAndSelect('schedules.project', 'projects')
      .where(
        'employee.identification = :identification AND schedules.createdAt >= :start AND schedules.createdAt <= :end',
        {
          identification: identification,
          start: pagination.start,
          end: pagination.end,
        },
      )
      .getOne();

    if (!employee) return new ApiResponse(false, ERROR.EMPLOYEE_NOT_FOUND);

    let totalHour = 0.0;
    for await (const total of employee.schedules) {
      totalHour += total.hour;
    }

    return new ApiResponse(true, SUCCESS.EMPLOYEE_FOUND, {
      ...employee,
      totalHour,
    });
  }

  async getByIdentification(identification: number): Promise<EmployeeEntity> {
    return await this.employeeRepository.findOne({
      where: {
        identification: identification,
      },
    });
  }

  async create(dto: CreateEmployeeDto): Promise<ApiResponse> {
    if (await this.getByIdentification(dto.identification))
      return new ApiResponse(false, ERROR.EMPLOYEE_EXIST);

    let employee = await this.employeeRepository.create(dto);

    await this.employeeRepository.save(employee);

    return new ApiResponse(
      true,
      SUCCESS.EMPLOYEE_CREATED,
      employee.identification,
    );
  }

  async update(
    identification: number,
    dto: UpdateEmployeeDto,
  ): Promise<ApiResponse> {
    const employee = await this.employeeRepository.findOne({
      where: { identification: identification },
    });

    if (!employee) return new ApiResponse(false, ERROR.EMPLOYEE_NOT_FOUND);

    await this.employeeRepository.update(
      { identification: identification },
      dto,
    );

    return new ApiResponse(true, SUCCESS.EMPLOYEE_UPDATED);
  }

  async delete(id: number): Promise<any> {
    const employee = await this.employeeRepository.findOne({
      where: { id: id },
    });

    if (!employee) return new ApiResponse(false, ERROR.EMPLOYEE_NOT_FOUND);

    await this.employeeRepository.save(employee);
    this.employeeRepository.softDelete({ id: id });

    return new ApiResponse(true, SUCCESS.EMPLOYEE_DELETED);
  }
}
