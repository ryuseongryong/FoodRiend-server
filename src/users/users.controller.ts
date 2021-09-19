import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('verify/:type')
  create(@Body() dto: CreateUserDto) {
    this.usersService.create(dto);
  }
  @Get('verify/token')
  @UseGuards(AuthGuard('bearer'))
  findAll() {
    return [];
  }

  @Get('profile/:id')
  getUserInfo(@Param('id') id: number) {
    this.usersService.getUserInfo(id);
  }

  @Patch('profile/:id')
  update(@Param('id') id: string) {}
}
