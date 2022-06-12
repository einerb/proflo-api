import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, } from 'class-validator';

import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';
import { States } from '../enum/state.enum';

export class UpdateServiceDto {
  @ApiProperty({
    description: 'Breve descripcion del servicio',
  })
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<description>> no puede estar vacío!' })
  description: string;

  @ApiProperty({
    description: 'Estado del servicio: ACTIVE o COMPLETED!'
  })
  @Transform((param) => param.value.toUpperCase())
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<description>> no puede estar vacío!' })
  state: States;
}
