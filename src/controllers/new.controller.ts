import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { CreateNewsDto } from 'src/entities/dto/create-news.dto';
import { NewService } from 'src/services/new.service';

@Controller('news')
export class NewController {
  constructor(private readonly newService: NewService) {}

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post(':id')
  async create(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateNewsDto,
  ) {
    return await this.newService.create(id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateNewsDto,
  ) {
    return await this.newService.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.newService.delete(id);
  }
}
