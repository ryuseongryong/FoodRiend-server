import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  authCode: string;
}

export class PatchUserDto {
  @ApiProperty()
  profileImage?: string;

  @ApiProperty()
  foodType?: string;

  @ApiProperty()
  foodStyle?: string;
}
