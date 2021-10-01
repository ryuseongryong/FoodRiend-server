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

@Controller('search')
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
  update(@Param('id') id: string) {}

  @Delete('feed/:id')
  remove(@Param('id') id: string) {}
}
