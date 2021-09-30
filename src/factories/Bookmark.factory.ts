import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Bookmark } from '../entities/Bookmark.entity';

define(Bookmark, (faker: typeof Faker) => {
  faker.locale = 'ko';
  const bookmark = new Bookmark()

  bookmark.user_id = Math.floor(Math.random() * 10) + 1;
  bookmark.house_info_id = Math.floor(Math.random() * 10) + 1;

  return bookmark;
});