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
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse as AR,
} from '@nestjs/swagger';

import { ApiResponse } from 'src/responses';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto, UpdateUserDto } from 'src/entities/dto/index';
import { IPaginationWithDates } from 'src/entities/interfaces/pagination';
import { Multer, UserService } from 'src/services/';
import { UpdatePasswordDto } from 'src/entities/dto/update-password.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('admin/:identification')
  async getAll(
    @Param('identification', ParseIntPipe) identification: number,
    @Query() pagination: IPaginationWithDates,
  ): Promise<ApiResponse> {
    return await this.userService.getAll(identification, pagination);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':identification')
  async getById(@Param('identification', ParseIntPipe) identification: number) {
    return await this.userService.findById(identification);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  async create(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Put(':identification')
  async update(
    @Param('identification', ParseIntPipe) identification: number,
    @Body() dto: UpdateUserDto,
  ) {
    return await this.userService.update(identification, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Put('password/:identification')
  async updatePassword(
    @Param('identification', ParseIntPipe) identification: number,
    @Body() password: UpdatePasswordDto,
  ) {
    return await this.userService.updatePassword(identification, password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.delete(id);
  }
}
