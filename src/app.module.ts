import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './modules/config.module';
import { ConfigService } from './services/config.service';
import { Config } from './entities/enum/config.enum';

import {
  AuthModule,
  CarModule,
  DatabaseModule,
  LicenseModule,
  NewModule,
  NotificationModule,
  RoleModule,
  ServiceModule,
  UserModule,
  WorkshopModule,
} from './modules/index';

@Module({
  imports: [
    /*  MulterModule.register({ dest: './files' }), */
    ScheduleModule.forRoot(),
    CarModule,
    LicenseModule,
    NewModule,
    NotificationModule,
    RoleModule,
    ServiceModule,
    UserModule,
    AuthModule,
    DatabaseModule,
    ConfigModule,
    WorkshopModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Config.SERVER_PORT);
  }
}
