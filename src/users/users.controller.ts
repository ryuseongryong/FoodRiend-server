import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('verfiy/:type')
  create(@Body() dto: CreateUserDto) {}

  @Get('verify/token')
  findAll() {}

  @Get('profile/:id')
  getUserInfo(@Param('id') id: number) {
    this.usersService.getUserInfo(id);
  }

  @Patch('profile/:id')
  update(@Param('id') id: string) {}
}
