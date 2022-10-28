import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './modules/config.module';
import { ConfigService } from './services/config.service';
import { Config } from './entities/enum/config.enum';

import {
  AuthModule,
  DatabaseModule,
  EmployeeModule,
  ScheduleModule,
  UserModule,
  ProjectModule
} from './modules/index';
import { OccupationModule } from './modules/occupation.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    DatabaseModule,
    ConfigModule,
    EmployeeModule,
    ScheduleModule,
    ProjectModule,
    OccupationModule
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
