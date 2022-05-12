import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';

export class UpdateUserDto {
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
  @IsDate()
  @Type(() => Date)
  birthdate?: Date;

  @ApiProperty()
  @IsOptional()
  phone?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  state?: boolean;
}
