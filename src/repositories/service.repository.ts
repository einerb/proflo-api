import { EntityRepository, Repository } from 'typeorm';

import { ServiceEntity } from '../entities/service.entity';

@EntityRepository(ServiceEntity)
export class ServiceRepository extends Repository<ServiceEntity> {}