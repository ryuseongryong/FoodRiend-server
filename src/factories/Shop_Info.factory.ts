import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Shop_Info } from '../entities/Shop_Info.entity';

define(Shop_Info, (faker: typeof Faker) => {
  const shopInfo = new Shop_Info()

  shopInfo.mainImage = faker.image.food();
  shopInfo.foodCategory = faker.random.word();
  shopInfo.menu = faker.random.word();
  shopInfo.aveRating = Math.floor(Math.random() * 10) * Math.floor(Math.random() * 10);
  shopInfo.contact = faker.phone.phoneNumber();
  shopInfo.title = faker.company.companyName();
  shopInfo.location = faker.address.streetAddress();

  return shopInfo;
});