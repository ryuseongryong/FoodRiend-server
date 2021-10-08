import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsNumber } from 'class-validator';

export class AddFriendDto {
  @IsArray()
  @IsNumber({}, { each: true })
  readonly idList: Array<number>;
}
