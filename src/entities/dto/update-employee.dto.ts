import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';

export class UpdateEmployeeDto {
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
