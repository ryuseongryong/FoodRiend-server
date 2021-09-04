import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Write_Board } from '../entities/Write_Board.entity';
import { Hashtag } from '../entities/Hashtag.entity';
import { Join_T } from '../entities/Join_T.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Write_Board, Hashtag, Join_T])],
  controllers: [BoardController],
  providers: [BoardService],
})
export class BoardModule {}
