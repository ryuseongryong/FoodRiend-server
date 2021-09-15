import { Module, NestModule } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Write_Board } from '../entities/Write_Board.entity';
import { Hashtag } from '../entities/Hashtag.entity';
import { Join_T } from '../entities/Join_T.entity';
import { UserMiddleware } from '../common/user.middleware';
import { Upload_Image } from '../entities/Upload_Image.entity';
import { Shop_Info } from '../entities/Shop_Info.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Write_Board,
      Hashtag,
      Join_T,
      Upload_Image,
      Shop_Info,
    ]),
  ],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule implements NestModule {
  configure(existUser: typeof UserMiddleware) {
    existUser.apply(UserMiddleware).forRoutes(BoardController);
  }
}
