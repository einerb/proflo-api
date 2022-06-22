import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

import { CreateNotificationsDto } from 'src/entities/dto/create-notifications.dto';
import { ApiResponse, ERROR, SUCCESS } from 'src/responses';
import { UserRepository } from 'src/repositories';
import { NotificationEntity, UserEntity } from 'src/entities';
import { NotificationRepository } from 'src/repositories/notification.repository';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: UserRepository,
    @InjectRepository(NotificationEntity)
    private notificationRepository: NotificationRepository,
  ) {}

  async create(
    user: UserEntity,
    dto: CreateNotificationsDto,
  ): Promise<ApiResponse> {
    const userFind = await this.userRepository.findOne({
      where: { identification: user.identification },
    });

    if (!userFind) return new ApiResponse(false, ERROR.USER_NOT_FOUND);

    const notification = await this.notificationRepository.create(dto);
    notification.users = <any>user.id;

    await notification.save();

    return new ApiResponse(true, SUCCESS.NOTIFICATION_CREATED, notification);
  }
}
