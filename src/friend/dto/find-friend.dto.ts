import { Exclude, Expose } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';

export class FindFriendDto {
  @IsArray()
  @IsString({ each: true })
  readonly phoneNumberList: Array<string>;
}
