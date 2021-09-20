import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SearchModule } from './search/search.module';
import { BoardModule } from './board/board.module';
import { FriendModule } from './friend/friend.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Write_Board } from './entities/Write_Board.entity';
import { Users } from './entities/Users.entity';
import { Bookmark } from './entities/Bookmark.entity';
import { Friend_List } from './entities/Friend_List.entity';
import { Hashtag } from './entities/Hashtag.entity';
import { Join_T } from './entities/Join_T.entity';
import { Shop_Info } from './entities/Shop_Info.entity';
import { Upload_Image } from './entities/Upload_Image.entity';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    UsersModule,
    SearchModule,
    BoardModule,
    FriendModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      synchronize: false, //true : 테이블 생성 후 싱크 맞춰추기 // false : 작동안함
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        Write_Board,
        Users,
        Bookmark,
        Upload_Image,
        Hashtag,
        Shop_Info,
        Join_T,
        Friend_List,
      ],
    }),
  ],
})
export class AppModule {}
