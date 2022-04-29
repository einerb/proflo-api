import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { NotificationService } from '../services/notification.service';
import { CreateNotificationDto } from '../entities/dto/';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('generate/:id')
  create(
    @Body() dto: CreateNotificationDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.notificationService.create(dto, id);
  }

  @Get(':identification')
  findAll(@Param('identification', ParseIntPipe) identification: number) {
    return this.notificationService.findAll(identification);
  }

  @Get('comments-accessory/:id_unique')
  findComments(@Param('id_unique') id_unique: string) {
    return this.notificationService.findComments(id_unique);
  }

  @Get('count/:identification')
  findCount(@Param('identification', ParseIntPipe) identification: number) {
    return this.notificationService.count(identification);
  }

  @Put(':id/seen')
  seen(@Param('id') id: number) {
    return this.notificationService.seen(+id);
  }
}
