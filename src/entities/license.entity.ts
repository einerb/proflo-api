import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  DeleteDateColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity({ name: 'licenses' })
export class LicenseEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 2, nullable: false })
  category: string;

  @Column({ type: 'date', nullable: true })
  expeditionDate: Date;

  @Column({ type: 'date', nullable: true })
  dueDate: Date;

  @Column({ type: 'varchar', length: 10, nullable: false })
  statusLicense: string;

  @Column({ type: 'boolean', nullable: true })
  state: boolean;

  @ManyToOne(() => UserEntity, (user) => user.licenses)
  users: UserEntity;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt: Date;
}
