import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, PatchUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from '../entities/Users.entity';

@Injectable()
export class UsersService {
  @InjectRepository(Users)
  private readonly usersRepository: Repository<Users>;

  async create(dto: CreateUserDto) {
    await this.usersRepository.save({
      name: 'jang',
      nickname: 'min',
      password: 'asdfasdf',
      profileImage: 'dasdf',
      phoneNumber: 'dd',
      foodType: 'ddd',
      foodStyle: 'ddd',
      isDeleted: true,
    });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, dto: PatchUserDto) {
    const user = await this.usersRepository.findOne({ id: id });

    if (Object.keys(dto).length === 0) {
      return new HttpException('Does empty request', 403);
    }

    for (const reqBody in dto) {
      user[reqBody] = dto[reqBody];
    }

    const updateUser = await this.usersRepository.save(user);

    return {
      data: {
        profileImage: updateUser.profileImage,
        foodType: updateUser.foodType,
        foodStyle: updateUser.foodStyle,
      },
      status: 200,
    };
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
