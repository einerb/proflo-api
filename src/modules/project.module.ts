import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController } from 'src/controllers/project.controller';
import { ProjectService } from 'src/services/project.service';

import { EmployeeEntity, ProjectEntity, ScheduleEntity } from '../entities';
import { ConfigService } from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, ScheduleEntity, EmployeeEntity])],
  controllers: [ProjectController],
  providers: [ProjectService, ConfigService],
  exports: [ProjectService],
})
export class ProjectModule {}
