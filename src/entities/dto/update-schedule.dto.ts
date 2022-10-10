import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';

export class UpdateScheduleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  hour?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<jornada>> no puede estar vacío!' })
  journey?: string;

  @ApiProperty()
  @IsNumber()
  employeeId?: number;

  @ApiProperty()
  @IsNumber()
  projectId?: number;
}
