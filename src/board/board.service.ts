import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hashtag } from '../entities/Hashtag.entity';
import { Join_T } from '../entities/Join_T.entity';
import { Write_Board } from '../entities/Write_Board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
  @InjectRepository(Write_Board)
  private readonly boardRepository: Repository<Write_Board>;
  @InjectRepository(Hashtag)
  private readonly hashtagRepository: Repository<Hashtag>;
  @InjectRepository(Join_T)
  private readonly joinTRepository: Repository<Join_T>;

  async create(id: number, dto: CreateBoardDto) {
    // const existTitle = await this.joinTRepository.findOne({
    //   title: dto.title,
    // });
    const resJoinT = await this.joinTRepository.save({
      title: dto.title,
      location: dto.location,
    });
    console.log(resJoinT);
    await this.boardRepository.save({ user_id: id });
    console.log(id, dto);
  }
}
