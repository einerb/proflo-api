import { Controller, UseGuards, Post, Body } from '@nestjs/common';

import { AuthService, UserService } from '../services';
import { LoginUserDto } from '../entities/dto/login.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UserService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  public async login(@Body() login: LoginUserDto) {
    const user = await this.usersService.getByEmail(login.email);

    return await this.authService.createToken(user);
  }
}
