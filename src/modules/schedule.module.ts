import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScheduleController } from '../controllers/schedule.controller';
import { EmployeeEntity, ProjectEntity, ScheduleEntity } from '../entities';
import { ScheduleService, ConfigService } from '../services';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity, EmployeeEntity, ScheduleEntity]),
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService, ConfigService],
  exports: [ScheduleService],
})
export class ScheduleModule {}
