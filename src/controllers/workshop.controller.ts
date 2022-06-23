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
  Req,
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

import { ApiResponse } from '../responses';
import { AuthGuard } from '@nestjs/passport';
import { CreateWorkshopDto } from 'src/entities/dto/index';
import { IPaginationWithDates } from 'src/entities/interfaces/pagination';
import { AuthService, WorkshopService } from 'src/services/';
import { UpdateWorkshopDto } from 'src/entities/dto/update-workshop.dto';

@Controller('workshop')
export class WorkshopController {
  constructor(
    private readonly workshopService: WorkshopService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getAll(
    @Req() request,
    @Query() pagination: IPaginationWithDates,
  ): Promise<ApiResponse> {
    const rawToken = request.headers['authorization'].split(' ')[1];
    const tokenDecode = this.authService.decodingJWT(rawToken);

    return await this.workshopService.getAll(tokenDecode.role, pagination);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/nit')
  async getById(@Req() request) {
    const rawToken = request.headers['authorization'].split(' ')[1];
    const tokenDecode = this.authService.decodingJWT(rawToken);

    return await this.workshopService.findById(tokenDecode);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':nit/:role')
  async getByIdRole(
    @Param('nit') nit: string,
    @Param('role') role: string,
    @Req() request,
  ) {
    const rawToken = request.headers['authorization'].split(' ')[1];
    const tokenDecode = this.authService.decodingJWT(rawToken);

    return await this.workshopService.findByIdRole(tokenDecode, nit, role);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  async create(@Body() dto: CreateWorkshopDto, @Req() request) {
    const rawToken = request.headers['authorization'].split(' ')[1];
    const tokenDecode = this.authService.decodingJWT(rawToken);

    return await this.workshopService.create(tokenDecode.role, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Put(':nit')
  async update(
    @Param('nit') nit: string,
    @Body() dto: UpdateWorkshopDto,
    @Req() request,
  ) {
    const rawToken = request.headers['authorization'].split(' ')[1];
    const tokenDecode = this.authService.decodingJWT(rawToken);

    return await this.workshopService.update(tokenDecode, nit, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number, @Req() request) {
    const rawToken = request.headers['authorization'].split(' ')[1];
    const tokenDecode = this.authService.decodingJWT(rawToken);

    return await this.workshopService.delete(tokenDecode.role, id);
  }
}
