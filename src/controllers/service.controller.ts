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

import { CreateServiceDto } from 'src/entities/dto/create-service.dto';
import { UpdateServiceDto } from 'src/entities/dto/update-service.dto';
import { ServiceService, AuthService } from 'src/services/';

@Controller('service')
export class ServiceController {
  constructor(
    private readonly serviceService: ServiceService,
    private readonly authService: AuthService,
  ) {}

  /* @UseGuards(AuthGuard('jwt'))
  @Get(':id/:idUser')
  async getById(
    @Param('id', ParseIntPipe) id: number,
    @Param('idUser', ParseIntPipe) idUser: number,
  ) {
    return await this.serviceService.findById(id, idUser);
  } */

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post(':id')
  async create(
    @Req() request,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateServiceDto,
  ) {
    const rawToken = request.headers['authorization'].split(' ')[1];
    const tokenDecode = this.authService.decodingJWT(rawToken);

    return await this.serviceService.create(tokenDecode.role, id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateServiceDto,
    @Req() request,
  ) {
    const rawToken = request.headers['authorization'].split(' ')[1];
    const tokenDecode = this.authService.decodingJWT(rawToken);

    return await this.serviceService.update(tokenDecode.role, id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Req() request) {
    const rawToken = request.headers['authorization'].split(' ')[1];
    const tokenDecode = this.authService.decodingJWT(rawToken);

    return await this.serviceService.delete(tokenDecode.role, id);
  }
}
