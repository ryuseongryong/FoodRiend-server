import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Write_Board } from '../entities/Write_Board.entity';

define(Write_Board, (faker: typeof Faker) => {
  faker.locale = 'ko';
  const writeBoard = new Write_Board();

  writeBoard.user_id = Math.floor(Math.random() * 10) + 1;
  writeBoard.house_info_id = Math.floor(Math.random() * 10) + 1;
  writeBoard.rating = Math.floor(Math.random() * 5);
  // writeBoard.best = Boolean(Math.round(Math.random()))
  writeBoard.reviews = faker.lorem.sentence();

  return writeBoard;
});
