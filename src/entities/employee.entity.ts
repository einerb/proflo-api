import {
  BaseEntity,
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ScheduleEntity } from './schedule.entity';

@Entity({ name: 'employee' })
export class EmployeeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  identification: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  fullname: string;

  @Column({ type: 'varchar', length: 70, nullable: false })
  occupation: string;

  @Column({ type: 'varchar', length: 70, nullable: true })
  city: string;

  @Column({ type: 'varchar', length: 70, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 12, nullable: true })
  phone: string;

  @Column({ type: 'boolean', default: true })
  state: boolean;

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.employee)
  schedules: ScheduleEntity[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt: Date;
}
