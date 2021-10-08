import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/Users.entity';
import { Friend_List } from '../entities/Friend_List.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      Friend_List,
      // Write_Board,
      // Bookmark,
      // Hashtag,
      // Shop_Info,
      // Upload_Image
    ]),
  ],
  controllers: [FriendController],
  providers: [FriendService],
})
export class FriendModule {}
