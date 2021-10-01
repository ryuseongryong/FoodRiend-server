import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hashtag } from '../entities/Hashtag.entity';
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
  @InjectRepository(Shop_Info)
  private readonly shopInfoRepository: Repository<Shop_Info>;
  @InjectRepository(Upload_Image)
  private readonly uploadImageRepository: Repository<Upload_Image>;

// 같은 이름일 때, 친구가 있어서 저장된 것 + 나머지 + 위치 우선순위
// google api 에서 가게 정보 받아와서
// DB 확인후
// 없으면 저장

  async create(id: number, dto: CreateBoardDto) {
    const existTitle = await this.shopInfoRepository.find({
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
      house_info_id: existTitle[0].id,
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
