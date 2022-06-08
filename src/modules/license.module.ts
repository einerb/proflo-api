import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LicenseController } from 'src/controllers/license.controller';
import { LicenseEntity } from '../entities/license.entity';
import { LicenseService } from 'src/services';

@Module({
  imports: [TypeOrmModule.forFeature([LicenseEntity])],
  controllers: [LicenseController],
  providers: [LicenseService],
  exports: [LicenseService],
})
export class LicenseModule {}
