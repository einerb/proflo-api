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
  fullname?: string;

  @ApiProperty()
  @IsNotBlank({ message: 'El campo <<ocupacion>> no puede estar vacío!' })
  occupation?: string;

  @ApiProperty()
  @IsOptional()
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
