import {
  Controller,
  UseGuards,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { AuthService, UserService } from '../services';
import { LoginUserDto, CreateUserDto } from '../entities/dto/';
import { AuthGuard } from '@nestjs/passport';
import {} from 'src/entities/dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post('create')
  async create(@Body() dto: CreateUserDto) {
    return await this.authService.create(dto);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  public async login(@Body() login: LoginUserDto) {
    const user = await this.userService.getByIdentification(
      login.identification,
    );

    return await this.authService.createToken(user);
  }
}
