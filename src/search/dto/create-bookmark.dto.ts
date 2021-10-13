import { Exclude, Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';

@Exclude()
export class CreateBookmarkDto {
  @Expose()
  readonly shopId: number;

  @Expose()
  readonly feedId: number[];

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
}
