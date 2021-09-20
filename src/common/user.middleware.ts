import { NextFunction, Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import { Join_T } from '../entities/Join_T.entity';
import { Shop_Info } from '../entities/Shop_Info.entity';
import { Users } from '../entities/Users.entity';
import axios from 'axios';
import { Hashtag } from '../entities/Hashtag.entity';
import { Friend_List } from '../entities/Friend_List.entity';

export async function UserMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // const { id } = req.params;
  // const joinT: Repository<Join_T> = getRepository(Join_T);
  // const usersRepository: Repository<Users> = getRepository(Users);
  // const shoptest: Repository<Shop_Info> = getRepository(Shop_Info);
  // const friendList: Repository<Friend_List> = getRepository(Friend_List);

  // // await joinT.save({ title: '스타벅스 원흥점', location: '원흥역' });
  // // await joinT.save({ title: '쿠우쿠우', location: '홍대' });
  // const usersRepository: Repository<Users> = getRepository(Users);

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
  // await usersRepository.save({
  //   name: 'minwoo friend',
  //   nickname: 'jjman',
  //   password: '12345',
  //   profileImage: 'eeerrr',
  //   phoneNumber: '123123',
  //   foodType: '어류',
  //   foodStyle: '쩝쩝과',
  //   isDeleted: false,
  // });
  // await usersRepository.save({
  //   name: 'minwoo friend2',
  //   nickname: 'man',
  //   password: '12345',
  //   profileImage: 'efefe',
  //   phoneNumber: '333',
  //   foodType: 'te',
  //   foodStyle: 'st',
  //   isDeleted: false,
  // });

  // await friendList.save({
  //   user_id: 1,
  //   friend: 2,
  //   isDeleted: false,
  // });

  // await friendList.save({
  //   user_id: 1,
  //   friend: 3,
  //   isDeleted: false,
  // });

  // await shoptest.save({
  //   mainImage: 'ewfqwef',
  //   foodCategory: 'asdfasdf',
  //   menu: 'wefq',
  //   aveRating: 3,
  //   contact: '2fwef',
  // });

  // await shoptest.save({
  //   mainImage: 'efeqfw3223',
  //   foodCategory: 'vvdvd',
  //   menu: 'vfvf',
  //   aveRating: 3,
  //   contact: 'wer',
  // });

  //google place API practice code
  // const decoded = encodeURIComponent('교촌치킨 화곡2호점');
  // const reference = `Aap_uECqFcKejrQaPvFVBFR13kImZ_nUUTKNcwv-dVEA1B6TzywM2k8ALNubCiEm3gBgzrCXnDr0MIUF4Zqa-3yZEV05Jps6IiOs63LBVqXT-iAh1y00266hhBWEM90Bnd54PWlkhwoXTW3j-wFkj2Fmhuxv-SzUVq5nrnnhLf2CRCr4HUtV`;
  // const FIND_URL = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${decoded}&key=${process.env.API_KEY}`;
  // const DETAIL_URL = `https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Crating%2Cformatted_phone_number%2Curl%2Cprice_level%2Copening_hours%2Cphotos%2Cvicinity%2Ctypes%2Cbusiness_status&place_id=ChIJa9bhoVGcfDUR4VteCyroAIM&key=${process.env.API_KEY}`;
  // const PHOTO_URL = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${reference}&key=${process.env.API_KEY}`;

  // const findPlace = await axios.get(FIND_URL, {
  //   headers: { 'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7' },
  // }); // 클라이언트 부분

  // const detail = await axios.get(DETAIL_URL, {
  //   headers: { 'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7' },
  // }); // 원하는 값 얻기

  // const photos = await axios.get(PHOTO_URL, {
  //   headers: { 'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7' },
  // }); // 이미지 파일 -> 바이너리 데이터
  // // const parseURL = url.parse(findPlace.data);

  // console.log(detail.data);
  // const existUser = await usersRepository.find({ id: Number(id) });
  // if (existUser.length === 0) {
  //   return res.status(401).send('not found user');
  // }
  next();
}
