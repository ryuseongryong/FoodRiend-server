import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Friend_List } from '../entities/Friend_List.entity';

define(Friend_List, (faker: typeof Faker) => {
  faker.locale = 'ko';
  const friendList = new Friend_List()

  friendList.user_id = Math.floor(Math.random() * 10) + 1;
  friendList.friend = Math.floor(Math.random() * 10) + 1;
  if(friendList.user_id !== friendList.friend) return friendList;
  else {
    friendList.user_id = 1
    friendList.friend = 2
    return friendList;
  }
});