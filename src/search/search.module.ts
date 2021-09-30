import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../entities/Users.entity';
import { Friend_List } from '../entities/Friend_List.entity';
import { Write_Board } from '../entities/Write_Board.entity';
import { Bookmark } from '../entities/Bookmark.entity';
import { Hashtag } from '../entities/Hashtag.entity';
import { Shop_Info } from '../entities/Shop_Info.entity';
import { Upload_Image } from '../entities/Upload_Image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      Friend_List,
      Write_Board,
      Bookmark,
      Hashtag,
      Shop_Info,
      Upload_Image
    ]),
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
