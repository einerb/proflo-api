import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OccupationController } from 'src/controllers/occupation.controller';

import { OccupationEntity } from 'src/entities/occupation.entity';
import { OccupationService } from 'src/services/occupation.service';
import { ConfigService } from '../services';

@Module({
  imports: [TypeOrmModule.forFeature([OccupationEntity])],
  controllers: [OccupationController],
  providers: [OccupationService, ConfigService],
  exports: [],
})
export class OccupationModule { }
