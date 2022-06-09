import { EntityRepository, Repository } from 'typeorm';

import { CarEntity } from 'src/entities';

@EntityRepository(CarEntity)
export class CarRepository extends Repository<CarEntity> {}
