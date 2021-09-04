import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  //   @ApiProperty({ description: '이미지' })
  readonly img: string;

  @IsNumber()
  //   @ApiProperty()
  readonly rating: number;

  @IsString()
  //   @ApiProperty()
  readonly comments: string;

  @IsString()
  //   @ApiProperty()
  readonly hashtag: string;

  @IsString()
  //   @ApiProperty()
  readonly title: string;

  @IsString()
  //   @ApiProperty()
  readonly location: string;
}
