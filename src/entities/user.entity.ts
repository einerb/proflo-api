import * as bcrypt from 'bcrypt';
import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', nullable: false, unique: true })
  identification: number;

  @Column({ type: 'varchar', length: 45, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 45, nullable: true })
  lastname: string;
/* 
  @ManyToOne(() => RoleEntity, (role) => role.id)
  @JoinColumn({ name: 'role_id' })
  rol: RoleEntity;

  @OneToOne(() => PhotoEntity, (photo) => photo.id, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'photo_id' })
  photo: PhotoEntity; */

  /* Relación Comment - Accessory */
  /*  @OneToMany(() => CommentEntity, (comment) => comment.userOwner, {
    cascade: true,
  })
  public users!: CommentEntity[]; */

  /* Relación Notification - Accessory */
  /* @OneToMany(() => NotificationEntity, (noti) => noti.user, {
    cascade: true,
  })
  public notifications!: NotificationEntity[]; */

  @Column({ type: 'varchar', length: 70, nullable: true })
  occupation: string;

  @Column({ type: 'varchar', length: 70, nullable: false })
  city: string;

  @Column({ type: 'varchar', length: 70, nullable: true })
  address: string;

  @Column({ type: 'date', nullable: true })
  birthdate: Date;

  @Column({ type: 'varchar', length: 12, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: false, select: false })
  password: string;

  @Column({ type: 'boolean', default: true })
  state: boolean;

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

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compareSync(attempt, this.password);
  }
}
