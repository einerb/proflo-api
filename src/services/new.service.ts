import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { NewEntity, ServiceEntity } from 'src/entities';
import { CreateNewsDto } from 'src/entities/dto/create-news.dto';
import { States } from 'src/entities/enum/state.enum';
import { NewRepository } from 'src/repositories/new.repository';
import { ServiceRepository } from 'src/repositories/service.repository';
import { ApiResponse, ERROR, SUCCESS } from 'src/responses';
import { NotificationService } from './notification.service';

@Injectable()
export class NewService {
  constructor(
    @InjectRepository(NewEntity) private newRepository: NewRepository,
    @InjectRepository(ServiceEntity)
    private serviceRepository: ServiceRepository,
    private readonly notificationService: NotificationService,
  ) {}

  async create(id: number, dto: CreateNewsDto): Promise<ApiResponse> {
    let newExist = await this.newRepository.findOne({
      where: {
        name: dto.name,
      },
    });
    if (newExist) return new ApiResponse(false, ERROR.NEW_EXIST);

    let service = await this.serviceRepository.findOne({
      relations: ['users'],
      where: {
        id: id,
      },
    });
    if (!service) return new ApiResponse(false, ERROR.SERVICE_NOT_FOUND);

    const news = await this.newRepository.create(dto);
    await news.save();

    if (service.state !== States.ACTIVE) service.state = States.ACTIVE;

    news.services = <any>service.id;
    await this.newRepository.save(news);
    await this.serviceRepository.save(service);

    this.notificationService.create(service.users, {
      title: 'Nueva novedad!',
      description: `Se ha agregado una nueva incidencia al servicio ID: ${service.hash}.`,
    });

    return new ApiResponse(true, SUCCESS.NEW_CREATED, news);
  }

  async update(id: number, dto: CreateNewsDto): Promise<ApiResponse> {
    const news = await this.newRepository.findOne({
      where: { id: id },
    });

    if (!news) return new ApiResponse(false, ERROR.NEW_NOT_FOUND);

    await this.newRepository.update({ id: id }, dto);

    return new ApiResponse(true, SUCCESS.NEW_UPDATED, news);
  }

  async delete(id: number): Promise<any> {
    const news = await this.newRepository.findOne({
      where: { id: id },
    });

    if (!news) return new ApiResponse(false, ERROR.NEW_NOT_FOUND);

    this.newRepository.softDelete({ id: id });

    return new ApiResponse(true, SUCCESS.NEW_DELETED);
  }
}
