import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServiceController } from 'src/controllers/service.controller';
import { NewEntity, ServiceEntity, UserEntity } from 'src/entities';
import { ServiceService } from 'src/services/service.service';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceEntity, UserEntity, NewEntity])],
  controllers: [ServiceController],
  providers: [ServiceService],
  exports: [ServiceService],
})
export class ServiceModule {}
