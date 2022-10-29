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
import { CreateEmployeeDto, UpdateEmployeeDto } from 'src/entities/dto/index';
import { IPaginationWithDates } from 'src/entities/interfaces/pagination';
import { EmployeeService } from 'src/services/';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async get(
  ) {
    return await this.employeeService.find();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':identification')
  async getById(
    @Query() pagination: IPaginationWithDates,
    @Param('identification', ParseIntPipe) identification: number,
  ) {
    return await this.employeeService.findById(identification, pagination);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  async create(@Body() dto: CreateEmployeeDto) {
    return await this.employeeService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Put(':identification')
  async update(
    @Param('identification', ParseIntPipe) identification: number,
    @Body() dto: UpdateEmployeeDto,
  ) {
    return await this.employeeService.update(identification, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.employeeService.delete(id);
  }
}
