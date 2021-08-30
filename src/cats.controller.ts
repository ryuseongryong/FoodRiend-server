import { Controller, Get, Req, Post, Param } from '@nestjs/common';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Post()
  create(): string {
    return 'This action adds a new cat';
  }

  @Get('ab*cd')
  findAll(@Req() request: Request): string {
    console.log(request);
    return 'This action return all cats';
  }

  @Get(':id')
  findOne(@Param() params): string {
    console.log(params.id);
    return `this action return a prari ${params.id}`;
  }
}
