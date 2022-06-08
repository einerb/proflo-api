import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarController } from 'src/controllers/car.controller';
import { CarEntity } from 'src/entities/car.entity';
import { CarService } from 'src/services/car.service';

@Module({
  imports: [TypeOrmModule.forFeature([CarEntity])],
  controllers: [CarController],
  providers: [CarService],
  exports: [CarService],
})
export class CarModule {}
