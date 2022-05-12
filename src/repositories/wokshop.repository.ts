import { EntityRepository, Repository } from 'typeorm';

import { WorkshopEntity } from '../entities/workshop.entity';

@EntityRepository(WorkshopEntity)
export class WorkshopRepository extends Repository<WorkshopEntity> {}
