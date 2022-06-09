import { EntityRepository, Repository } from 'typeorm';

import { NewEntity } from '../entities/new.entity';

@EntityRepository(NewEntity)
export class NewRepository extends Repository<NewEntity> {}
