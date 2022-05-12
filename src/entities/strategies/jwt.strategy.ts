import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ApiResponse, ERROR } from 'src/responses';
import { AuthService } from '../../services/auth.service';
import { Config } from 'src/entities/enum/config.enum';
import { ConfigService } from '../../services/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get(Config.JWT_ENCRYPTION),
      passReqToCallback: true,
    });
  }

  async validate(req, payload: any, done: Function) {
    const user = await this.authService.validateUserToken(payload);
    if (!user) {
      return done(ERROR.USER_UNAUTHORIZED, false);
    }
    done(null, user);
  }
}
