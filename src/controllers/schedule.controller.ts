import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { CreateScheduleDto } from 'src/entities/dto/create-schedule.dto';
import { UpdateScheduleDto } from 'src/entities/dto/update-schedule.dto';
import { IPaginationWithDates } from 'src/entities/interfaces/pagination';
import { ScheduleService } from 'src/services/schedule.service';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async get(
    @Query() pagination: IPaginationWithDates,
  ) {
    return await this.scheduleService.find(pagination);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async getByEmployeeExist(
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.scheduleService.findByEmployeeExist(id);
  }

  /* @UseGuards(AuthGuard('jwt')) */
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  async create(@Body() dto: CreateScheduleDto) {
    return await this.scheduleService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateScheduleDto,
  ) {
    return await this.scheduleService.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.scheduleService.delete(id);
  }
}
