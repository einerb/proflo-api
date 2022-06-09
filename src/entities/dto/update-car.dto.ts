import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';

export class UpdateCarDto {
  @ApiProperty({
    description: 'Color vehiculo',
  })
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<color>> no puede estar vacío!' })
  color: string;

  @ApiProperty({
    description: 'Marca del vehiculo',
  })
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<brand>> no puede estar vacío!' })
  brand: string;

  @ApiProperty({
    description: 'Linea del vehiculo',
  })
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<line>> no puede estar vacío!' })
  line: string;

  @ApiProperty({
    description: 'Fecha de matricula',
  })
  @IsDate()
  @Type(() => Date)
  enrollmentDate: Date;

  @ApiProperty({
    description:
      'Tipo de vehiculo como AUTOMOVIL, MOTOCARRO, CAMPERO, CAMIONETA, BUS, CAMION, etc.',
  })
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<typeVehicle>> no puede estar vacío!' })
  typeVehicle: string;

  @ApiProperty({
    description:
      'Tipo de servicio que presta el vehiculo como PARTICULAR O PUBLICO',
  })
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<typeService>> no puede estar vacío!' })
  typeService: string;

  @ApiProperty({
    description: 'Modelo del vehiculo',
  })
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<model>> no puede estar vacío!' })
  model: string;

  @ApiProperty({
    description: 'Pais de origen del vehiculo',
  })
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<countryOrigin>> no puede estar vacío!' })
  countryOrigin: string;

  @ApiProperty({
    description: 'Numero de serie del vehiculo',
  })
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<noSerie>> no puede estar vacío!' })
  noSerie: string;

  @ApiProperty({
    description: 'Numero de motor del vehiculo',
  })
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<noMotor>> no puede estar vacío!' })
  noMotor: string;

  @ApiProperty({
    description: 'Numero del chasis del vehiculo',
  })
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<noChasis>> no puede estar vacío!' })
  noChasis: string;

  @ApiProperty({
    description: 'Numero de identificacion del vehiculo ',
  })
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<noVin>> no puede estar vacío!' })
  noVin: string;

  @ApiProperty({
    description: 'Tonelaje del vehiculo',
  })
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<tonnage>> no puede estar vacío!' })
  tonnage: string;

  @ApiProperty({
    description: 'Divipola del vehiculo',
  })
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  divipola: number;

  @ApiProperty({
    description: 'Cilindraje del vehiculo',
  })
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<cilindraje>> no puede estar vacío!' })
  cylinder: string;

  @ApiProperty({
    description: 'Peso Bruto Vehicular',
  })
  @IsNotEmpty()
  @IsNotBlank({
    message: 'El campo <<peso bruto vehicular>> no puede estar vacío!',
  })
  pbv: string;

  @ApiProperty({
    description: 'Cantidad de ocupantes',
  })
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<occupant>> no puede estar vacío!' })
  occupant: string;

  @ApiProperty({
    description: 'Carroceria del vehiculo',
  })
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<bodywork>> no puede estar vacío!' })
  bodywork: string;

  @ApiProperty({
    description: 'Tipo de combustible usado por el vehiculo',
  })
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<fuel>> no puede estar vacío!' })
  fuel: string;

  @ApiProperty({
    description: 'Entidad de transito asociada',
  })
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<transitAgency>> no puede estar vacío!' })
  transitAgency: string;

  @ApiProperty({
    description: 'Numero de SOAT',
  })
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<soat>> no puede estar vacío!' })
  soatNumber: string;

  @ApiProperty({
    description: 'Fecha de expedicion del SOAT',
  })
  @IsDate()
  @Type(() => Date)
  expeditionDateSoat: Date;

  @ApiProperty({
    description: 'Fecha de vencimiento SOAT',
  })
  @IsDate()
  @Type(() => Date)
  dueDateSoat: Date;

  @ApiProperty({
    description: 'Revision tecnica',
  })
  @IsBoolean()
  @IsNotEmpty()
  techReview: boolean;

  @ApiProperty({
    description: 'Se requiere?',
  })
  @IsBoolean()
  @IsNotEmpty()
  requireTechReview: boolean;

  @ApiProperty({
    description: 'Blindaje del vehiculo',
  })
  @IsBoolean()
  @IsNotEmpty()
  isShielding: boolean;

  @ApiProperty({
    description: 'Nivel del blindado',
  })
  levelShielding: string;

  @ApiProperty({
    description: 'Fecha del blindaje',
  })
  @IsEmpty()
  @Type(() => Date)
  dateShielding: Date;

  @ApiProperty({
    description: 'Estado del vehiculo en los diferentes entes nacionales',
  })
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<statusVehicle>> no puede estar vacío!' })
  statusVehicle: string;

  @ApiProperty({
    description: 'Estado del vehiculo en la plataforma',
  })
  @IsBoolean()
  @IsNotEmpty()
  state?: boolean;
}
