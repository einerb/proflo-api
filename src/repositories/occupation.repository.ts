import { EntityRepository, Repository } from 'typeorm';

import { OccupationEntity } from '../entities/occupation.entity';

@EntityRepository(OccupationEntity)
export class OccupationRepository extends Repository<OccupationEntity> {}
