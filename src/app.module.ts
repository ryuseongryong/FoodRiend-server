import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CatsController } from './cats.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SearchModule } from './search/search.module';
import { BoardModule } from './board/board.module';
import { FriendModule } from './friend/friend.module';

@Module({
  controllers: [AppController, CatsController],
  providers: [AppService],
  imports: [UsersModule, SearchModule, BoardModule, FriendModule],
})
export class AppModule {}
