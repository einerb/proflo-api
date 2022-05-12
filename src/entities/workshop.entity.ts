import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  DeleteDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { UserEntity } from './user.entity';

@Entity({ name: 'workshops' })
export class WorkshopEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false, unique: true })
  nit: string;

  @Column({ type: 'varchar', length: 45, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  phone: string;

  @Column({ type: 'int', nullable: false })
  limit_users: number;

  @Column({ type: 'boolean', default: true })
  state: boolean;

  @Column({ type: 'int', nullable: true })
  limit: number;

  @ManyToMany(() => UserEntity, (user) => user.workshops)
  users: UserEntity[];

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
