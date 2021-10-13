import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Friend_List } from '../entities/Friend_List.entity';
import { Users } from '../entities/Users.entity';
import { AddFriendDto } from './dto/add-friend.dto';
import { CreateFriendDto } from './dto/create-friend.dto';
import { FindFriendDto } from './dto/find-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    @InjectRepository(Friend_List)
    private readonly friendListRepository: Repository<Friend_List>,
  ) {}
  //!@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  async findAll(userArray: FindFriendDto) {
    const phoneNumberList = userArray['phoneNumberList'];
    let isData = true;

    // users DB에서 userArray에 포함된 phoneNumber와 일치하는 PhoneNumber를 가진 user정보를 가져와야 함

    const userListData = await this.usersRepository.find({
      phoneNumber: In(phoneNumberList),
    });

    if (userListData.length === 0) {
      isData = false;
      return { data: null, status: 200, isData: isData };
    }

    const userList = userListData.map((user) => {
      return {
        id: user.id,
        kakaoId: user.kakaoId,
        email: user.email,
        name: user.name,
        nickname: user.nickname,
        profile: user.profileImage,
        foodType: user.foodType,
        foodStyle: user.foodStyle,
      };
    });

    return { data: userList, status: 200, isData: isData };
  }

  //!@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  async addFriend(id: number, idArray: AddFriendDto) {
    const idList = idArray['idList'];
    let isData = true;

    const userListData = await this.usersRepository.find({
      id: In(idList),
    });
    // 친구등록하는 로직 구현

    // if (userListData.length === 0) {
    //   isData = false;
    //   return { data: null, status: 200, isData: isData };
    // }

    // 친구 신청상태의 테이블

    const addFriendObjArr = idList.map((friend) => {
      return { user_id: id, friend };
    });

    const addFriendQuery = await this.friendListRepository
      .createQueryBuilder('friend')
      .insert()
      .into(Friend_List)
      .values(addFriendObjArr)
      .orIgnore()
      .updateEntity(false)
      .execute();

    //?@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    //? 반대의 경우도 친구추가해주기
    const addOppositeFriendObjArr = idList.map((friend) => {
      return { user_id: friend, friend: id };
    });

    const addOppositeFriendQuery = await this.friendListRepository
      .createQueryBuilder('friend')
      .insert()
      .into(Friend_List)
      .values(addOppositeFriendObjArr)
      .updateEntity(false)
      .orIgnore()
      .execute();

    // 추가적으로 친구 추천 -> 친구 신청 -> 상대방에서 친구 수락 했을 때 동작해야함
    // 친구 목록 -> 친구 해제 -> 삭제

    const userList = userListData.map((user) => {
      return {
        id: user.id,
        kakaoId: user.kakaoId,
        email: user.email,
        name: user.name,
        nickname: user.nickname,
        profile: user.profileImage,
        foodType: user.foodType,
        foodStyle: user.foodStyle,
      };
    });
    return { data: userList, status: 200, isData: isData };
  }

  async getList(id: number) {
    let isData = true;
    const friendListData = await this.friendListRepository.find({
      user_id: id,
    });
    if (friendListData.length === 0) {
      isData = false;
      return {
        data: null,
        status: 200,
        isData: isData,
      };
    }

    const friendList = friendListData.map((el) => el.friend);

    const friendUserData = await this.usersRepository.find({
      id: In(friendList),
    });

    const friendUser = friendUserData.map((user) => {
      return {
        name: user.name,
        nickname: user.nickname,
        profileImg: user.profileImage,
      };
    });

    return { data: friendUser, status: 200, isData: isData };
  }

  update(id: number, updateFriendDto: UpdateFriendDto) {
    return `This action updates a #${id} friend`;
  }

  async delete(userId: number, removeFriendId: number) {
    await this.friendListRepository.delete({
      user_id: userId,
      friend: removeFriendId,
    });
    await this.friendListRepository.delete({
      user_id: removeFriendId,
      friend: userId,
    });
    return { data: { userId, friendId: removeFriendId }, status: 200 };
  }
}
