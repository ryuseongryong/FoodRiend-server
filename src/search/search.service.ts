import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, createQueryBuilder, Like, ILike } from 'typeorm';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';
import { Users } from '../entities/Users.entity';
import { Friend_List } from '../entities/Friend_List.entity';
import { Write_Board } from '../entities/Write_Board.entity';
import { Bookmark } from '../entities/Bookmark.entity';
import { Hashtag } from '../entities/Hashtag.entity';
import { Upload_Image } from '../entities/Upload_Image.entity';
import { NotFoundError } from 'rxjs';
import { Shop_Info } from '../entities/Shop_Info.entity';
import { Client, Language } from '@googlemaps/google-maps-services-js'
const qs = require('query-string')

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
    @InjectRepository(Shop_Info)
    private readonly shopInfoRepository:
    Repository<Shop_Info>,
    @InjectRepository(Upload_Image)
    private readonly uploadImageRepository: Repository<Upload_Image>
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
    // uploadImage - foodImage,
    // shopInfo - location,
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
        'img.foodImage',
        'writeBoard.rating',
        'writeBoard.comments',
        'hashtag.tag',
        'writeBoard.created_at',
      ])
      .leftJoin('writeBoard.user', 'user')
      .leftJoin('writeBoard.hashtag', 'hashtag')
      .leftJoin('writeBoard.shopInfo', 'shopInfo')
      .leftJoin('writeBoard.img', 'img')
      .where('writeBoard.user_id IN (:id)', { id: friendList })
      .getMany();

    const refinedData = allData.map((el) => {
      return {
        userId: el.user.id,
        name: el.user.name,
        profile: el.user.profileImage,
        image: el.img.map((el) => el.foodImage),
        // 배열 내 객체 형태, hashtag: el.hashtag,
        hashtag: el.hashtag.map((hashtagEl) => hashtagEl.tag),
        location: el.shopInfo.location,
        title: el.shopInfo.title,
        comments: el.comments,
        rating: el.rating,
        created_at: el.created_at,
      };
    });

    return { data: refinedData, status: 200, isData: isData };
  }

  async findResult(id: number, query: string) {

    const client = new Client({});
    let isUserData = true;
    let isShopData = true;
    // 입력 받은 query문으로 google api 검색하기
    // 검색은 구글신이 자동으로 우리의 위치를 파악해서 반경 5KM이내의 결과값만 가져다 줌 + 한국 전화번호 제외하고 대부분 정보 포함한 것으로 확인됨.
    // ! textSearch로 가져온 정보를 수정해서 search 결과에 담는다.
    // ! 해당 정보와 title이 일치하는 것이 있을 경우, 그 데이터와 연관된 정보를 가져온다.
    const textSearch = await client.textSearch({
      params: {
        query: query, 
        language: 'ko' as Language, 
        key: process.env.API_KEY
      },
      timeout: 1000
    })
    
    const shopNameList = [];
    const textSearchShopInfoGoogleAPI = textSearch.data.results;
    const shopInfoGoogleAPI = textSearchShopInfoGoogleAPI.map((result) => {
      shopNameList.push(result.name)
      let pt = result.photos
      if(result.photos === undefined) {
        result.photos = [{photo_reference: null, height: 640, width: 400, html_attributions:[]}]
      }
      return {
        isDB: false,
        title: result.name,
        mainImg: result.photos[0].photo_reference,
        foodCategory: result.types,
        location: result.formatted_address,
        relatedImg: result.photos,
        aveRating: result.rating,
        menu: null,
        friends: null
      }
    })
    console.log(shopInfoGoogleAPI)
    
//? 전화번호 등 정보를 가져오기 위해서 Detail 필요, 없는 정보는 알아서 제외됨
    // const placeIdList = []
    // const addCheck = []
    // for(let searchData of textSearch.data.results) {
    //   for(let PID in searchData) {
    //     if(PID === 'place_id') {
    //       placeIdList.push(searchData[PID]);
    //       // console.log("PID: ", PID, searchData[PID])
    //     }
    //     else if(PID === 'formatted_address') {
    //       addCheck.push(searchData[PID])
    //     }
    //   }
    // }
    // const placeId = textSearch.data.results[0].place_id
    // console.log(placeIdList, addCheck, textSearch.data.results[0])
  
    // const placeDetails = await client.placeDetails({
    //   params: {
    //     place_id: placeId,
    //     fields: ['formatted_phone_number', 'formatted_address', 'name', 'opening_hours', 'photos', 'price_level', 'rating', 'types', 'url', 'vicinity'], 
    //     language: 'ko' as Language, 
    //     key: process.env.API_KEY
    //   },
    //   timeout: 1000
    // })
    // console.log("placeDetails.data", placeDetails.data)
    //? return ;
    
    // user : 
    //   user - user id,
    //          name,
    //          nickName,
    //          profileImage,
    //          foodType,
    //          foodStyle,
    // shop : 
    //   shopInfo - title,
    //              mainImage,
    //              foodCategory,
    //              location,
    //              aveRating,
    //              menu,
    //   uploadImage - foodImage,
    //   friends : 
    //     user - user id,
    //            name,
    //            nickName,
    //            profileImage,
    //     WriteBoard - comments,
    //                 rating

    // ! nickName으로 검색된 유저 정보 가져오기
    // 1. query와 일치하는 nickName을 가진 user 정보를 가져온다.
    
      // 1) nickName이 query와 일치하는 경우
    // const nickNameUserData = await this.usersRepository.find({nickname: query})

      // 2) nickName이 query가 포함된 경우
    

    const nickNameUserData = await this.usersRepository.find({nickname: Like(`%${query}%`)})

    if(nickNameUserData.length === 0) isUserData = false;


    // const nickNameUserData2 = await this.usersRepository.find({nickname: ILike(`%${query}%`)})
    
      // 3) nickName이 query로 시작하는 경우
    // const nickNameUserData = await this.usersRepository.find({nickname: Like(`%${query}`)})

    // 2. 검색된 user의 comment 개수를 체크해서 완성된 데이터에 포함시켜준다.
    const idList = nickNameUserData.map((el) => el.id)
    const countList = [];

    for(let searchedId of idList) {
      const countData = await this.writeBoardRepository.count({user_id: searchedId})
      countList.push(countData)
    }

    const nickNameUserList = nickNameUserData.map((user, idx) => {
      return {
        userId : user.id,
        name : user.name,
        nickName : user.nickname,
        profileImg : user.profileImage,
        foodType : user.foodType,
        foodStyle : user.foodStyle,
        commentCount : countList[idx]
      }
    })

    // ! shop정보 및 관련된 friends 정보 가져오기
    // 1. query가 포힘된 shop title의 shop과 관련된 정보를 가져온다.
    const allData = await this.shopInfoRepository
      .createQueryBuilder('shopInfo')
      .select([
        'shopInfo.title',
        'shopInfo.mainImage',
        'shopInfo.foodCategory',
        'shopInfo.location',
        'img.foodImage',
        'shopInfo.aveRating',
        'shopInfo.menu',
        'user.id',
        'user.name',
        'user.nickName',
        'user.profileImage',
        'writeBoard.rating',
        'writeBoard.comments',
        'hashtag.tag',
      ])
      .leftJoin('shopInfo.writeBoard', 'writeBoard')
      .leftJoin('shopInfo.img', 'img')
      .leftJoin('writeBoard.hashtag', 'hashtag')
      .leftJoin('writeBoard.user', 'user')
      .where(`shopInfo.title LIKE :title`, { title: `%${query}%` })
      .getMany();

      if(allData.length === 0 && textSearchShopInfoGoogleAPI.length === 0) isShopData = false;

      // 2.1. shop관련 정보를 API에 맞게 변경한다.
      // 2.2. user의 id를 기반으로 친구 정보를 가져와서 친구가 작성한 게시물만 저장한다.
    const friendsListData = await this.friendListRepository.find({
      user_id: id,
    });
    const friendList = friendsListData.map((el) => el.friend);

    const shopInfoList = allData.map((el) => {
      const filteredWB = el.writeBoard.filter((wbEl, idx) => {
        return friendList.includes(wbEl.user.id)
      })
      return {
        isDB: true,
        title: el.title,
        mainImg: el.mainImage,
        foodCategory: el.foodCategory,
        location: el.location,
        relatedImg: el.img.map((imgEl) => imgEl.foodImage),
        aveRating: el.aveRating,
        menu: el.menu,
        friends: filteredWB.map((fWBEl) => {
          return {
            userId: fWBEl.user.id,
            name: fWBEl.user.name,
            nickName: fWBEl.user.nickname,
            profileImg: fWBEl.user.profileImage,
            rating: fWBEl.rating,
            comments: fWBEl.comments,
            hashtag: fWBEl.hashtag.map((hashtagEl) => hashtagEl.tag)
          }
        })
      }
    })

    const shopInfo = [...shopInfoList, ...shopInfoGoogleAPI]

    //! userData와 shopData가 모두 없을 경우
    if(!isUserData && !isShopData) return new HttpException(`No Matching Results`, 404)

    return {data: {user: nickNameUserList, shopInfo: shopInfo}, status:200, isUserData, isShopData};
  }

  findFriend(id: number, query: string) {
    // 이름/닉네임/연락처로 친구만 검색
    return `This action returns a #${id} search`;
  }

  update(id: number, updateSearchDto: UpdateSearchDto) {
    return `This action updates a #${id} search`;
  }

  remove(id: number) {
    return `This action removes a #${id} search`;
  }
}
