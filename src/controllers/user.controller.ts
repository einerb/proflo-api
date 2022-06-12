import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto, UpdateUserDto } from 'src/entities/dto/index';
import { AuthService, UserService } from 'src/services/';

@Controller('user')
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':identification')
  async getById(
    @Param('identification', ParseIntPipe) identification: number,
    @Req() request,
  ) {
    const rawToken = request.headers['authorization'].split(' ')[1];
    const tokenDecode = this.authService.decodingJWT(rawToken);

    return await this.userService.findById(tokenDecode.role, identification);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  async create(@Body() dto: CreateUserDto, @Req() request) {
    const rawToken = request.headers['authorization'].split(' ')[1];
    const tokenDecode = this.authService.decodingJWT(rawToken);

    return await this.userService.create(tokenDecode.role, dto);
  }

  /* @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('Admin')
  async createTest(@Body() dto: CreateUserDto) {
    return await this.userService.createTest(dto);
  } */

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
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Req() request) {
    const rawToken = request.headers['authorization'].split(' ')[1];
    const tokenDecode = this.authService.decodingJWT(rawToken);

    return await this.userService.delete(tokenDecode.role, id);
  }
}
