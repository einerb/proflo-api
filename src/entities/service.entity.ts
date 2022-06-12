import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  DeleteDateColumn,
  ManyToOne,
} from 'typeorm';

import { States } from './enum/state.enum';
import { NewEntity } from './new.entity';
import { UserEntity } from './user.entity';

@Entity({ name: 'services' })
export class ServiceEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  hash: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'enum', enum: States, default: States.CREATED })
  state: States;

  @OneToMany(() => NewEntity, (newE) => newE.services)
  news: NewEntity[];

  @ManyToOne(() => UserEntity, (user) => user.services)
  users: UserEntity;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt: Date;
}
