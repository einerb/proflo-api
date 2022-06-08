import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NewController } from 'src/controllers/new.controller';
import { NewEntity } from 'src/entities';
import { NewService } from 'src/services/new.service';

@Module({
  imports: [TypeOrmModule.forFeature([NewEntity])],
  controllers: [NewController],
  providers: [NewService],
  exports: [NewService],
})
export class NewModule {}
