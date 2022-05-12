import * as fs from 'fs';
import { parse } from 'dotenv';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const env = process.env.NODE_ENV.trim();
    const envFilePath = __dirname + `/../../${env}.env`;
    if (this.existsPath(env, envFilePath))
      this.envConfig = parse(fs.readFileSync(envFilePath));
    else this.envConfig = { PORT: process.env.PORT };
  }

  get(key: string): string {
    return this.envConfig[key];
  }

  private existsPath(env: string, path: string): boolean {
    const existsPath = fs.existsSync(path);
    if (!existsPath) console.error(`${env}.env file does not exist`);
    return existsPath;
  }
}
