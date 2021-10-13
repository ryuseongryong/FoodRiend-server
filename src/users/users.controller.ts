import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, PatchUserDto } from './dto/create-user.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
// import { AuthGuard } from '@nestjs/passport';

@ApiTags('Profile')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // kakaoId, loginType을 받으면 DB에 저장하고
  // 이후에 Local 정보를 입력받으면 patch로 연결하여 프로필 정보를 수정한다.
  // @Post('verify/:type')
  // create(@Body() dto: CreateUserDto) {
  //   this.usersService.createUserInfo(dto);
  // }

  @Get('profile/:id')
  @ApiOperation({
    summary: '프로필 API',
    description: '프로필관련 정보를 응답한다.',
  })

  // 인증하고 params 유지
  @ApiParam({ name: 'id' })
  getUserInfo(@Param('id') id: number) {
    this.usersService.getUserInfo(id);
  }

  @Patch('profile/:id')
  @ApiOperation({
    summary: '프로필 수정 API',
    description: '프로필 이미지, 음식타입등 프로필관정 정보를 수정한다.',
  })
  @ApiParam({ name: 'id' })
  @ApiBody({ type: PatchUserDto })
  update(@Param('id') id: number, @Body() dto: PatchUserDto) {
    return this.usersService.update(id, dto);
  }
}
