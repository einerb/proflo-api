import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';

export class UpdatePasswordDto {
  @ApiProperty()
  @IsNotBlank({ message: 'El campo <<contraseña>> no puede estar vacío!' })
  @IsNotEmpty()
  password?: string;
}
