import { NextFunction, Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { Users } from '../entities/Users_entity';
import { Join_T } from '../entities/Join_T.entity';
import { Shop_Info } from '../entities/Shop_Info.entity';
import { Users } from '../entities/Users.entity';


export async function UserMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params;
  const usersRepository: Repository<Users> = getRepository(Users);
 
  // ({
  //   name: '이름',
  //   nickname: '닉네임',
  //   password: '비밀번호',
  //   profileImage: 'url',
  //   phoneNumber: '연락처',
  //   foodType: '맛집스타일',
  //   foodStyle: '음식취향',
  //   isDeleted: false,
  // });

  // const test: Repository<Join_T> = getRepository(Join_T);
  // test.save({ title: '스타벅스 원흥점', location: '원흥역' });
  // const usersRepository: Repository<Users> = getRepository(Users);
  // await usersRepository.save({
  //   name: 'minwoo',
  //   nickname: 'justmin',
  //   password: '12345',
  //   profileImage: 'wefwef',
  //   phoneNumber: '123123',
  //   foodType: '고기',
  //   foodStyle: '모험가',
  //   isDeleted: false,
  // });
  // const shoptest: Repository<Shop_Info> = getRepository(Shop_Info);

  // shoptest.save({
  //   mainImage: 'ewfqwef',
  //   foodCategory: 'asdfasdf',
  //   menu: 'wefq',
  //   aveRating: 3,
  //   contact: '2fwef',
  // });

  const existUser = await usersRepository.find({ id: Number(id) });
  if (existUser.length === 0) {
    return res.status(401).send('not found user');
  }
  next();
}
