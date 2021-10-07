import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsEmail, IsNumber, IsString } from 'class-validator';

@Exclude()
export class CreateUserDto {
  // @IsEmail()
  @Expose()
  readonly email: string;

  // @IsString()
  @Expose()
  readonly loginType: string;

  // @IsString()
  @Expose()
  readonly name: string;

  // @IsString()
  @Expose()
  readonly nickname: string;

  // @IsString()
  @Expose()
  readonly password: string;

  // @IsString()
  @Expose()
  readonly profileImage: string;

  // @IsString()
  @Expose()
  readonly phoneNumber: string;

  // @IsString()
  @Expose()
  readonly foodType: string;

  // @IsString()
  @Expose()
  readonly foodStyle: string;

  // @IsBoolean()
  @Expose()
  readonly isDeleted: boolean;
}

export class PatchUserDto {
  @ApiProperty()
  profileImage?: string;

  @ApiProperty()
  foodType?: string;

  @ApiProperty()
  foodStyle?: string;
}
