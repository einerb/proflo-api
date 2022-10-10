import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';

export class CreateScheduleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  hour?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNotBlank({ message: 'El campo <<jornada>> no puede estar vacío!' })
  journey?: string;

  @ApiProperty()
  employeeId?: number;

  @ApiProperty()
  @IsNumber()
  identification?: number;

  @ApiProperty()
  @IsNumber()
  projectId?: number;
}
