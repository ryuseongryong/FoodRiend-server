import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Hashtag } from '../entities/Hashtag.entity';


define(Hashtag, (faker: typeof Faker) => {
  faker.locale = 'ko';
  const hashtag = new Hashtag();

  hashtag.write_board_id = Math.floor(Math.random() * 19) + 1;
  hashtag.tag = faker.lorem.words();

  return hashtag;
});