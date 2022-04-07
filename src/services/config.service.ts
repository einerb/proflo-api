import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { parse } from 'dotenv';

@Injectable()
export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const env = process.env.NODE_ENV.trim().toLowerCase();
    const envFilePath = __dirname + `/../../.env`;
    if (this.existsPath(env, envFilePath))
      this.envConfig = parse(fs.readFileSync(envFilePath));
    else this.envConfig = { PORT: process.env.PORT };
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  private existsPath(env: string, path: string): boolean {
    const existsPath = fs.existsSync(path);
    if (!existsPath) console.log(`${env}.env file does not exist`);
    return existsPath;
  }
}
