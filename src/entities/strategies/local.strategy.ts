import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { ApiResponse, ERROR } from 'src/responses';

import { AuthService } from '../../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'identification',
      passwordField: 'password',
    });
  }

  async validate(identification: number, password: string): Promise<any> {
    const user = await this.authService.validateUser(identification, password);
    
    if (!user) {
      /* throw new UnauthorizedException(); */
      throw new HttpException(
        new ApiResponse(false, ERROR.USER_UNAUTHORIZED),
        HttpStatus.FORBIDDEN,
      );
    }
    return user;
  }
}
