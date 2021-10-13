import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SearchService } from './search.service';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { BookmarkType } from './bookmark.type';

@Controller('api/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('feed/:id')
  mainPage(@Param('id') id: number) {
    return this.searchService.mainPage(id);
  }

  @Get('result/:id')
  findResult(@Param('id') id: number, @Query('search_query') query: string) {
    return this.searchService.findResult(id, query);
  }

  @Get('friend/:id')
  findFriend(@Param('id') id: number, @Query('search_query') query: string) {
    return this.searchService.findFriend(id, query);
  }

  @Patch('bookmark/:type/:id')
  bookmark(
    @Param('type') type: BookmarkType['wantOrBest'],
    @Param('id') id: number,
    @Body() body: CreateBookmarkDto,
  ) {
    return this.searchService.bookmark(type, id, body);
  }

  @Delete('feed/:id')
  remove(@Param('id') id: string) {}
}
