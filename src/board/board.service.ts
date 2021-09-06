import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hashtag } from '../entities/Hashtag.entity';
import { Join_T } from '../entities/Join_T.entity';
import { Shop_Info } from '../entities/Shop_Info.entity';
import { Upload_Image } from '../entities/Upload_Image.entity';
import { Write_Board } from '../entities/Write_Board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardService {
  @InjectRepository(Write_Board)
  private readonly boardRepository: Repository<Write_Board>;
  @InjectRepository(Hashtag)
  private readonly hashtagRepository: Repository<Hashtag>;
  @InjectRepository(Join_T)
  private readonly joinTRepository: Repository<Join_T>;
  @InjectRepository(Upload_Image)
  private readonly uploadImageRepository: Repository<Upload_Image>;

  async create(id: number, dto: CreateBoardDto) {
    const existTitle = await this.joinTRepository.find({
      id: dto.shopId,
    });

    if (existTitle.length === 0) {
      throw new HttpException('Not found shop', 401);
    }

    const writeBoard = await this.boardRepository.save({
      user_id: id,
      rating: dto.rating,
      best: false,
      isDeleted: false,
      join_t_id: existTitle[0].id,
      comments: dto.comments,
    });

    for (let i = 0; i < dto.hashtag.length; i++) {
      await this.hashtagRepository.save({
        write_board_id: writeBoard.id,
        tag: dto.hashtag[i],
      });
    }

    for (let i = 0; i < dto.img.length; i++) {
      await this.uploadImageRepository.save({
        foodImage: dto.img[i],
        write_board_id: writeBoard.id,
        house_info_id: existTitle[0].id,
      });
    }

    return {
      data: {
        feed: {
          feedId: writeBoard.id,
          title: dto.title,
          Hashtag: dto.hashtag,
          location: dto.location,
          img: dto.img,
          rating: dto.rating,
          comments: dto.comments,
        },
        status: 200,
      },
    };
  }

  async delete(id: number) {
    const existBoard = await this.boardRepository.find({
      id: id,
    });

    if (existBoard.length === 0) {
      return new HttpException('Not found board', 401);
    }

    await this.boardRepository.update(
      {
        isDeleted: false,
        id: id,
      },
      { isDeleted: true },
    );
    await this.hashtagRepository.delete({
      write_board_id: id,
    });
    await this.uploadImageRepository.delete({
      write_board_id: id,
    });

    return {
      data: {
        feedId: id,
      },
      status: 200,
    };
  }
}
