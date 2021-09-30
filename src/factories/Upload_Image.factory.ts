import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Upload_Image } from '../entities/Upload_Image.entity';

define(Upload_Image, (faker: typeof Faker) => {
  faker.locale = 'ko';
  const uploadImage = new Upload_Image()
  const food = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  let oneFood = food[Math.floor(Math.random()*food.length)]

  uploadImage.foodImage = faker.image.imageUrl(640, 480, oneFood, true);
  uploadImage.write_board_id = Math.floor(Math.random() * 19) + 1
  uploadImage.house_info_id = Math.floor(Math.random() * 10) + 1

  return uploadImage;
});