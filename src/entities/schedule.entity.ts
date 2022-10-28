import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { EmployeeEntity } from './employee.entity';
import { ProjectEntity } from './project.entity';

@Entity({ name: 'schedule' })
export class ScheduleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'double', nullable: false })
  hour: number;

  @Column({ type: 'varchar', nullable: false })
  journey: string;

  @ManyToOne(() => EmployeeEntity, (employee) => employee.schedules, { onDelete: 'CASCADE' })
  employee: EmployeeEntity;

  @ManyToOne(() => ProjectEntity, (project) => project.schedule, { onDelete: 'CASCADE' })
  project: ProjectEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt: Date;
}
