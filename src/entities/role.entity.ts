import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';

import { UserEntity } from './user.entity';
import { Roles } from './enum/role.enum';

@Entity({ name: 'roles' })
export class RoleEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: Roles, default: Roles.USER })
  role: Roles;

  @OneToMany(() => UserEntity, (user) => user.role, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    cascade: true,
  })
  users: UserEntity[];

  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt: Date;
}
