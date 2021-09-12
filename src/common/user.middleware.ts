import { NextFunction, Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { Users } from '../entities/Users.entity';

export async function UserMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.params;
  const usersRepository: Repository<Users> = getRepository(Users);
  await usersRepository.save({
    name: '이름',
    nickname: '닉네임',
    password: '비밀번호',
    profileImage: 'url',
    phoneNumber: '연락처',
    foodType: '맛집스타일',
    foodStyle: '음식취향',
    isDeleted: false,
  });

  const existUser = await usersRepository.find({ id: Number(id) });
  if (existUser.length === 0) {
    return res.status(401).send('not found user');
  }
  next();
}