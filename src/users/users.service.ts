import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
