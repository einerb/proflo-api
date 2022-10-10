import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EmployeeController } from '../controllers/employee.controller';
import { EmployeeEntity, ProjectEntity, ScheduleEntity } from '../entities';
import { EmployeeService, ConfigService } from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeEntity, ScheduleEntity])],
  controllers: [EmployeeController],
  providers: [EmployeeService, ConfigService],
  exports: [EmployeeService],
})
export class EmployeeModule {}
