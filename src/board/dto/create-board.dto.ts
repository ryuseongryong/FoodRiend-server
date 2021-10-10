import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsNumber, IsString } from 'class-validator';

Exclude();
export class CreateBoardDto {
  @IsNumber()
  @ApiProperty()
  readonly shopId: number;

  @IsArray()
  @ApiProperty({ description: '이미지' })
  readonly img: string[];

  @IsNumber()
  @ApiProperty()
  readonly rating: number;

  @Expose()
  @ApiProperty()
  readonly reviews: string;

  @IsArray()
  @ApiProperty()
  readonly hashtag: string[];

  @IsString()
  @ApiProperty()
  readonly title: string;

  @IsString()
  @ApiProperty()
  readonly location: string;
}
