import { ConfigService } from '../services/config.service';
import { ConfigModule } from '../modules/config.module';
import { ConnectionOptions } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Config } from '../entities/enum/config.enum';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(configService: ConfigService) {
      return {
        type: configService.get(Config.DB_TYPE),
        host: configService.get(Config.DB_HOST),
        port: parseInt(configService.get(Config.DB_PORT)),
        username: configService.get(Config.DB_USER),
        password: configService.get(Config.DB_PASSWORD),
        database: configService.get(Config.DB_NAME),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        subscribers: ['dist/**/**/**/*.subscriber{.ts,.js}'],
        synchronize: true,
        logging: process.env.NODE_ENV.trim() === 'development',
        retryAttempts: 10,
        retryDelay: 3000,
        autoLoadEntities: true,
        keepConncetionAlive: true,
      } as ConnectionOptions;
    },
  }),
];
