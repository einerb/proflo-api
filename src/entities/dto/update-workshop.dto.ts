import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';

export class UpdateWorkshopDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<nombre>> no puede estar vacío!' })
  name: string;

  @ApiProperty()
  @IsOptional()
  address: string;

  @ApiProperty()
  @IsOptional()
  phone: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  limit_users?: number;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  state?: boolean;
}
