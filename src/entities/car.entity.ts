import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  DeleteDateColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'cars' })
export class CarEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 7, nullable: false })
  plate: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  color: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  brand: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  line: string;

  @Column({ type: 'date', nullable: false })
  enrollmentDate: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  typeVehicle: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  typeService: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  model: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  countryOrigin: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  noSerie: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  noMotor: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  noChasis: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  noVin: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  tonnage: string;

  @Column({ type: 'int', nullable: false })
  divipola: number;

  @Column({ type: 'varchar', length: 10, nullable: true })
  cylinder: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  pbv: string;

  @Column({ type: 'varchar', length: 6, nullable: true })
  occupant: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  bodywork: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  fuel: string;

  @Column({ type: 'text', nullable: false })
  transitAgency: string;

  @Column({ type: 'varchar', nullable: false })
  soatNumber: string;

  @Column({ type: 'date', nullable: false })
  expeditionDateSoat: Date;

  @Column({ type: 'date', nullable: false })
  dueDateSoat: Date;

  @Column({ type: 'boolean', nullable: false })
  techReview: boolean;

  @Column({ type: 'boolean', nullable: false })
  requireTechReview: boolean;

  @Column({ type: 'boolean', nullable: true })
  isShielding: boolean;

  @Column({ type: 'varchar', nullable: true })
  levelShielding: string;

  @Column({ type: 'date', nullable: true })
  dateShielding: Date;

  @Column({ type: 'varchar', length: 10, nullable: true })
  statusVehicle: string;

  @Column({ type: 'boolean', nullable: true })
  state: boolean;

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
