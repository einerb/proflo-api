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
import { CreateLicenseDto } from 'src/entities/dto/create-license.dto';
import { ApiResponse } from 'src/responses';

import { LicenseService, AuthService } from 'src/services/';

@Controller('license')
export class LicenseController {
  constructor(
    private readonly licenseService: LicenseService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':identification')
  async getAll(
    @Param('identification', ParseIntPipe) identification: number,
  ): Promise<ApiResponse> {
    return await this.licenseService.getAll(identification);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  @Post(':id')
  async create(
    @Req() request,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateLicenseDto,
  ) {
    const rawToken = request.headers['authorization'].split(' ')[1];
    const tokenDecode = this.authService.decodingJWT(rawToken);

    return await this.licenseService.create(tokenDecode.role, id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateLicenseDto,
    @Req() request,
  ) {
    const rawToken = request.headers['authorization'].split(' ')[1];
    const tokenDecode = this.authService.decodingJWT(rawToken);

    return await this.licenseService.update(tokenDecode.role, id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Req() request) {
    const rawToken = request.headers['authorization'].split(' ')[1];
    const tokenDecode = this.authService.decodingJWT(rawToken);

    return await this.licenseService.delete(tokenDecode.role, id);
  }
}
