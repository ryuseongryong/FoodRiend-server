import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';

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

  @IsString()
  @ApiProperty()
  readonly comments: string;

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
