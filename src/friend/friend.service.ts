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

  async addFriend(id: number, idArray: AddFriendDto) {
    const idList = idArray['idList'];
    let isData = true;

    const userListData = await this.usersRepository.find({
      id: In(idList),
    });
    // 친구등록하는 로직 구현

    const addFriendObjArr = idList.map((friend) => {
      return { user_id: id, friend };
    });

    const insert = await this.friendListRepository
      .createQueryBuilder('friend')
      .insert()
      .into(Friend_List)
      .values(addFriendObjArr)
      .execute();

    console.log(
      'idList@@',
      idList,
      '\naddFriendObjArr',
      addFriendObjArr,
      '\ninsert@@',
      insert,
    );

    if (userListData.length === 0) {
      isData = false;
      return { data: null, status: 200, isData: isData };
    }

    const userList = userListData.map((user) => {
      return {
        id: user.id,
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

  update(id: number, updateFriendDto: UpdateFriendDto) {
    return `This action updates a #${id} friend`;
  }

  remove(id: number) {
    return `This action removes a #${id} friend`;
  }
}
