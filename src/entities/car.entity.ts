import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  DeleteDateColumn,
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

  @Column({ type: 'varchar', length: 25, nullable: true })
  line: string;

  @Column({ type: 'date', nullable: false })
  enrollmentDate: Date;

  @Column({ type: 'varchar', length: 20, nullable: false })
  typeVehicle: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  typeService: string;

  @Column({ type: 'varchar', length: 4, nullable: false })
  model: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  countryOrigin: string;

  @Column({ type: 'varchar', length: 22, nullable: false })
  noSerie: string;

  @Column({ type: 'varchar', length: 22, nullable: false })
  noMotor: string;

  @Column({ type: 'varchar', length: 22, nullable: false })
  noChasis: string;

  @Column({ type: 'varchar', length: 22, nullable: false })
  noVin: string;

  @Column({ type: 'varchar', length: 6, nullable: false })
  tonnage: string;

  @Column({ type: 'int', nullable: false })
  divipola: number;

  @Column({ type: 'varchar', length: 6, nullable: false })
  cylinder: string;

  @Column({ type: 'varchar', length: 6, nullable: false })
  pbv: string;

  @Column({ type: 'varchar', length: 3, nullable: false })
  occupant: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  bodywork: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
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

  @Column({ type: 'varchar', length: 7, nullable: false })
  statusVehicle: string;

  @Column({ type: 'boolean', nullable: true })
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
}
