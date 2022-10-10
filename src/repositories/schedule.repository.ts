import { EntityRepository, Repository } from 'typeorm';

import { ScheduleEntity } from 'src/entities';

@EntityRepository(ScheduleEntity)
export class ScheduleRepository extends Repository<ScheduleEntity> {}
