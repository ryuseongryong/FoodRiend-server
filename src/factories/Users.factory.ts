import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Users } from '../entities/Users.entity';

define(Users, (faker: typeof Faker) => {
  const user = new Users();

  user.name = faker.name.findName();
  user.nickname = faker.random.word();
  user.password = faker.random.word();
  user.profileImage = faker.image.people();
  user.phoneNumber = faker.phone.phoneNumber();
  user.foodType = faker.commerce.productMaterial();
  user.foodStyle = faker.commerce.productName();
  return user;
});
