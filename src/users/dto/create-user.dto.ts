import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  authCode: string;
}
