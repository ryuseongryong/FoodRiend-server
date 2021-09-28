import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Friend_List } from '../entities/Friend_List.entity';

define(Friend_List, (faker: typeof Faker) => {
  const friendList = new Friend_List()

  friendList.user_id = Math.floor(Math.random() * 10) + 1;
  friendList.friend = friendList.user_id + Math.floor(Math.random() * 10) + 1;

  return friendList;
});