import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, createQueryBuilder } from 'typeorm';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';
import { Users } from '../entities/Users.entity';
import { Friend_List } from '../entities/Friend_List.entity';
import { Write_Board } from '../entities/Write_Board.entity';
import { Bookmark } from '../entities/Bookmark.entity';
import { Hashtag } from '../entities/Hashtag.entity';
import { Upload_Image } from '../entities/Upload_Image.entity';
import { NotFoundError } from 'rxjs';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Friend_List)
    private readonly friendListRepository: Repository<Friend_List>,
    @InjectRepository(Write_Board)
    private readonly writeBoardRepository: Repository<Write_Board>,
    @InjectRepository(Bookmark)
    private readonly bookmarkRepository: Repository<Bookmark>,
    @InjectRepository(Hashtag)
    private readonly hashtagRepository: Repository<Hashtag>,
  ) {}

  create(createSearchDto: CreateSearchDto) {
    return 'This action adds a new search';
  }

  async mainPage(id: number) {
    // usersRepository의 id === friendListRepository의 user_id 인 경우,
    // friendListRepository의 friend === usersRepository의 id인 경우,
    // WriteBoardRepository의 정보와 ShopInfoRepository 등등을 가져와야함

    // Friend - user id,
    //          name,
    //          profileImage,
    // shopInfo - mainImage
    //            location,
    //            title,
    // Hashtag - tag,
    // WriteBoard - comments,
    //              rating,
    //              created_at
    const userData = await this.usersRepository.find({id: id});
    if(userData.length === 0) return new HttpException('There is no Friend', 404);

    // 1. user의 friendsList를 바탕으로 해당 friend의 Id를 가져온다.
    const friendsListData = await this.friendListRepository.find({
      user_id: id,
    });
    /* [{
      id: 3,
      user_id: 2,
      friend: 3,
      isDeleted: false,
      created_at: 2021-09-27T01:52:28.774Z,
      updated_at: 2021-09-27T01:52:28.774Z
    }]*/

    // 친구가 없는 애는 status : 200, isData = false
    // 가입하지 않은 유저는 에러
    let isData = true;
    if (friendsListData.length === 0) {
      isData = false;
      return { data: null, status: 200, isData: isData };
      
    }

    const friendList = friendsListData.map((el) => el.friend);
    // 2. friendList를 user table의 id에 대입하여 user id, name, profileImage를 가져온다.

    const allData = await this.writeBoardRepository
      .createQueryBuilder('writeBoard')
      .select([
        'user.id',
        'user.name',
        'user.profileImage',
        'shopInfo.title',
        'shopInfo.location',
        // upload_Image - foodImage
        'shopInfo.mainImage',
        'writeBoard.rating',
        'writeBoard.comments',
        'hashtag.tag',
        'writeBoard.created_at',
      ])
      .leftJoin('writeBoard.user', 'user')
      .leftJoin('writeBoard.hashtag', 'hashtag')
      .leftJoin('writeBoard.shopInfo', 'shopInfo')
      .where('writeBoard.user_id IN (:id)', { id: friendList })
      .getMany();

    const refinedData = allData.map((el) => {
      return {
        userId: el.user.id,
        name: el.user.name,
        profile: el.user.profileImage,
        image: el.shopInfo.mainImage,
        // 배열 내 객체 형태, hashtag: el.hashtag,
        hashtag: el.hashtag.map((hashtag) => hashtag.tag),
        location: el.shopInfo.location,
        title: el.shopInfo.title,
        comments: el.comments,
        rating: el.rating,
        created_at: el.created_at,
      };
    });

    return { data: refinedData, status: 200, isData: isData };
  }

  findAll() {
    return `This action returns all search`;
  }

  findOne(id: number) {
    return `This action returns a #${id} search`;
  }

  update(id: number, updateSearchDto: UpdateSearchDto) {
    return `This action updates a #${id} search`;
  }

  remove(id: number) {
    return `This action removes a #${id} search`;
  }
}
