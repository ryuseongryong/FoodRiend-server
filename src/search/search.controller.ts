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
  findAll(@Param('id') id: string, @Query('search_query') query: string) {}

  @Get('friend/:id')
  findOne(@Param('id') id: string, @Query() query: string) {}

  @Patch('bookmark/:type/:id')
  update(@Param('id') id: string) {}

  @Delete('feed/:id')
  remove(@Param('id') id: string) {}
}
