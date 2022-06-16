import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';

export class CompletedServiceDto {
  @ApiProperty({
    description: 'Total del servicio',
  })
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<total>> no puede estar vacío!' })
  total: number;
}
