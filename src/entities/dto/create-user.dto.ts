import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

import { IsLength } from 'src/decorators/length.decorator';
import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';

export class CreateUserDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsLength({
    message:
      'La identificación debe contener mínimo 7 números y máximo 10 números!',
  })
  @Type(() => Number)
  identification?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<nombre>> no puede estar vacío!' })
  name?: string;

  @ApiProperty()
  @IsOptional()
  lastname?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  role_id: number;

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
  @IsEmail()
  @IsNotEmpty()
  email?: string;

  @ApiProperty()
  @IsNotBlank({ message: 'El campo <<contraseña>> no puede estar vacío!' })
  @IsNotEmpty()
  password?: string;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  state?: boolean;
}
