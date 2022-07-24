import * as bcrypt from 'bcrypt';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import {
  CarEntity,
  LicenseEntity,
  NotificationEntity,
  RoleEntity,
  ServiceEntity,
  WorkshopEntity,
} from './index';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false })
  identification: number;

  @Column({ type: 'varchar', length: 45, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  lastname: string;

  @Column({ type: 'boolean', nullable: false, default: true })
  gender?: boolean;

  @Column({ type: 'text', nullable: true })
  avatar?: string;

  @ManyToOne(() => RoleEntity, (role) => role.id)
  @JoinColumn({ name: 'role_id' })
  role: RoleEntity;

  @Column({ type: 'varchar', length: 70, nullable: true })
  occupation: string;

  @Column({ type: 'varchar', length: 70, nullable: false })
  city: string;

  @Column({ type: 'varchar', length: 70, nullable: true })
  address: string;

  @Column({ type: 'varchar', nullable: true })
  birthdate: string;

  @Column({ type: 'varchar', length: 12, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false, select: false })
  password: string;

  @Column({ type: 'boolean', default: true })
  state: boolean;

  @OneToOne(() => CarEntity)
  @JoinColumn()
  car: CarEntity;

  @OneToMany(() => ServiceEntity, (service) => service.users)
  services: ServiceEntity[];

  @OneToMany(() => LicenseEntity, (license) => license.users)
  licenses: LicenseEntity[];

  @OneToMany(() => NotificationEntity, (notification) => notification.users)
  notifications: NotificationEntity[];

  @ManyToMany(() => WorkshopEntity, (workshop) => workshop.users, {
    cascade: true,
  })
  @JoinTable({
    name: 'workshops_users',
    joinColumns: [{ name: 'userId' }, { name: 'workshopId' }],
  })
  workshops: WorkshopEntity[];

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

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compareSync(attempt, this.password);
  }
}
