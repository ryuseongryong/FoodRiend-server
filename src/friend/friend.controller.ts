import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FriendService } from './friend.service';
import { FindFriendDto } from './dto/find-friend.dto';
import { AddFriendDto } from './dto/add-friend.dto';

@Controller('api/friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Post('find')
  findAll(@Body() body: FindFriendDto) {
    return this.friendService.findAll(body);
  }

  @Post('add/:id')
  addFriend(@Param('id') id: number, @Body() body: AddFriendDto) {
    return this.friendService.addFriend(id, body);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {}
}
