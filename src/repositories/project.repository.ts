import { EntityRepository, Repository } from 'typeorm';

import { ProjectEntity } from 'src/entities';

@EntityRepository(ProjectEntity)
export class ProjectRepository extends Repository<ProjectEntity> {}
