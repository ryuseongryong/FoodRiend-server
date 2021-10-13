import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsNumber, IsString } from 'class-validator';

Exclude();
export class CreateBoardDto {
  @Expose()
  readonly mainImage: string;

  @Expose()
  readonly foodCategory: string;

  @Expose()
  readonly menu: string;

  @Expose()
  readonly contact: string;

  @Expose()
  readonly title: string;

  @Expose()
  readonly location: string;

  @Expose()
  @ApiProperty()
  readonly shopId: number;

  @Expose()
  @ApiProperty({ description: '이미지' })
  readonly img: string[];

  @IsNumber()
  @ApiProperty()
  readonly rating: number;

  @Expose()
  @ApiProperty()
  readonly reviews: string;

  @Expose()
  readonly best: boolean;

  @Expose()
  @ApiProperty()
  readonly hashtag: string[];
}
