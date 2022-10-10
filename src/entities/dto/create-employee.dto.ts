import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

import { IsLength } from 'src/decorators/length.decorator';
import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';

export class CreateEmployeeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsLength({
    message:
      'La identificación debe contener mínimo 7 números y máximo 10 números!',
  })
  identification?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<nombre>> no puede estar vacío!' })
  name?: string;

  @ApiProperty()
  @IsOptional()
  lastname?: string;

  @ApiProperty()
  @IsOptional()
  occupation?: string;

  @ApiProperty()
  @IsNotBlank({ message: 'El campo <<ciudad>> no puede estar vacío!' })
  @IsNotEmpty()
  city?: string;

  @ApiProperty()
  @IsOptional()
  address?: string;

  @ApiProperty()
  @IsOptional()
  phone?: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  state?: boolean;
}
