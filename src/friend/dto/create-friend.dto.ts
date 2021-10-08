import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateFriendDto {
  @Expose()
  readonly user_id: number;

  @Expose()
  readonly friend: number;
}
