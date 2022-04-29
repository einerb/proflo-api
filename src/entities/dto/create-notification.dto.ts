import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';

export class CreateNotificationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<detalles>> no puede estar vacío!' })
  details?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<tipo>> no puede estar vacío!' })
  type?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotBlank({ message: 'El campo <<latitude>> no puede estar vacío!' })
  latitude?: number;

  @ApiProperty()
  @IsNumber()
  @IsNotBlank({ message: 'El campo <<longitude>> no puede estar vacío!' })
  longitude?: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  user_id?: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  user_owner?: number;
}
