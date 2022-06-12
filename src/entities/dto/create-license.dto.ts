import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNotEmpty } from 'class-validator';

import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';

export class CreateLicenseDto {
  @ApiProperty({
    description: 'Categoría de la licencia',
  })
  @IsNotEmpty()
  @Transform((param) => param.value.toUpperCase())
  @IsNotBlank({ message: 'El campo <<category>> no puede estar vacío!' })
  category: string;

  @ApiProperty({
    description: 'Fecha de expedición de la categoría',
  })
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<expeditionDate>> no puede estar vacío!' })
  expeditionDate: Date;

  @ApiProperty({
    description: 'Fecha de vencimiento de la categoría',
  })
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<dueDate>> no puede estar vacío!' })
  dueDate: Date;

  @ApiProperty({
    description: 'Estado de la categoría en el tránsito',
  })
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<statusLicense>> no puede estar vacío!' })
  statusLicense: string;

  @ApiProperty({
    description: 'Estado de la categoría en el sistema',
  })
  @IsBoolean()
  @IsNotEmpty()
  state?: boolean;
}
