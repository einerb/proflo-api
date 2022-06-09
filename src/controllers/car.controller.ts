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

import { CreateCarDto } from 'src/entities/dto';
import { UpdateCarDto } from 'src/entities/dto/update-car.dto';
import { CarService, AuthService } from 'src/services/';

@Controller('vehicle')
export class CarController {
  constructor(
    private readonly carService: CarService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':plate')
  async getById(@Param('plate') plate: string) {
    return await this.carService.findById(plate);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  async create(@Body() dto: CreateCarDto, @Req() request) {
    const rawToken = request.headers['authorization'].split(' ')[1];
    const tokenDecode = this.authService.decodingJWT(rawToken);

    return await this.carService.create(tokenDecode.role, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Put(':plate')
  async update(
    @Param('plate') plate: string,
    @Body() dto: UpdateCarDto,
  ) {
    return await this.carService.update(plate, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Req() request) {
    const rawToken = request.headers['authorization'].split(' ')[1];
    const tokenDecode = this.authService.decodingJWT(rawToken);

    return await this.carService.delete(tokenDecode.role, id);
  }
}
