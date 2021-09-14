import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, PatchUserDto } from './dto/create-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('verfiy/:type')
  create(@Body() dto: CreateUserDto) {
    this.usersService.create(dto);
  }

  @Get('verify/token')
  findAll() {}

  @Get('profile/:id')
  findOne(@Param('id') id: string) {}

  @Patch('profile/:id')
  update(@Param('id') id: number, @Body() dto: PatchUserDto) {
    return this.usersService.update(id, dto);
  }
}
