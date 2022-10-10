import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty()
  readonly identification: number;

  @ApiProperty()
  readonly password: string;
}
