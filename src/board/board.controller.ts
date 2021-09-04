import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';
import { Write_Board } from '../entities/Write_Board.entity';
const resCreateBoard = {
  schema: {
    properties: {
      data: {
        type: 'object',
        properties: {
          feed: {
            type: 'object',
            properties: {
              feedId: { type: 'number' },
              title: { type: 'string' },
              hashtag: { type: 'array' },
              img: { type: 'string' },
              location: { type: 'string' },
              rating: { type: 'string' },
              comments: { type: 'string' },
            },
          },
        },
      },
      status: { type: 'number' },
    },
  },
};
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post('write/:id')
  @ApiOperation({
    summary: '게시물 등록 API',
    description: '게시물을 등록한다',
  })
  @ApiOkResponse(resCreateBoard)
  @ApiBody({ type: CreateBoardDto })
  create(@Param('id') id: number, @Body() dto: CreateBoardDto) {
    return this.boardService.create(id, dto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {}
}
