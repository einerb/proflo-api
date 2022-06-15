import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';

export class CreateNewsDto {
  @ApiProperty({
    description: 'Nombre de la novedad',
  })
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<name>> no puede estar vacío!' })
  name: string;

  @ApiProperty({
    description: 'Descripcion de la novedad',
  })
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<description>> no puede estar vacío!' })
  description: string;
}
