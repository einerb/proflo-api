import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, } from 'class-validator';

import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';

export class CreateServiceDto {
  @ApiProperty({
    description: 'Breve descripcion del servicio',
  })
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<description>> no puede estar vacío!' })
  description: string;
}
