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
import { CreateProjectDto } from 'src/entities/dto/create-project.dto';
import { IPaginationDate } from 'src/entities/interfaces/pagination';
import { ProjectService } from 'src/services/project.service';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async get() {
    return await this.projectService.find();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':name')
  async getId(
    @Param('name') name: string,
    @Query() pagination: IPaginationDate,
  ) {
    return await this.projectService.findById(name, pagination);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  async create(@Body() dto: CreateProjectDto) {
    return await this.projectService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateProjectDto,
  ) {
    return await this.projectService.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.projectService.delete(id);
  }
}
