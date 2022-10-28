import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { OccupationService } from 'src/services/occupation.service';

@Controller('occupation')
export class OccupationController {
  constructor(private readonly occupationService: OccupationService) { }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async get() {
    return await this.occupationService.find();
  }
}
