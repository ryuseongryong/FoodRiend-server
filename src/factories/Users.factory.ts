import { define } from 'typeorm-seeding';
import Faker from 'faker';
import { Users } from '../entities/Users.entity';

define(Users, (faker: typeof Faker) => {
  faker.locale = 'ko';
  const user = new Users();
  const foodType = ['술', '커피', '베이커리/디저트', '해산물', '치킨', '피자', '면', '분식', '샐러드', '국밥', '찌개/탕', '고기'];
  const foodStyle = ['지역 맛집 탐험가', '새로운 음식 모험가', '분야별 맛집 전문가', '숨은 맛집 개척자', '분위기 맛집 예술가'];

  user.name = faker.name.findName();
  user.nickname = faker.address.city();
  user.password = faker.random.word();
  user.profileImage = faker.image.imageUrl(640, 480, user.name, true);
  user.phoneNumber = faker.phone.phoneNumber();
  user.foodType = foodType[Math.floor(Math.random()*foodType.length)]
  user.foodStyle = foodStyle[Math.floor(Math.random()*foodStyle.length)]
  return user;
});
