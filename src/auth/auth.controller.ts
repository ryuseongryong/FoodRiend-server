import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('kakao')
  login(@Req() req, @Res() res: Response) {
    return this.authService.login(req.user, res);
  }

  @UseGuards(JwtAuthGuard)
  @Post('createInfo')
  createUserInfo(@Req() req, @Body() body: CreateUserDto) {
    return this.usersService.createUserInfo(req.user.userId, body);
  }

  // @UseGuards(AuthGuard('local'))
  @Get('logout')
  logout(@Req() req, @Res() res: Response) {
    return this.authService.logout(req, res);
  }
}
