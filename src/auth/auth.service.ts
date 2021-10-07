import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { isEmail } from 'class-validator';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // email과 loginType으로 유저를 찾거나, 없으면 새로 생성
  async validateUser(email: string, loginType: string): Promise<any> {
    let user = await this.usersService.findOne(email);
    if (user && user.loginType === loginType) {
      const { password, ...result } = user;
      return result;
    } else if (!user && isEmail(email) && loginType === 'Kakao') {
      user = await this.usersService.createEmail(email, loginType);
      const { ...result } = user;
      return result;
    }
    return null;
  }

  // 문제점, 첫 번째 로그인 시도시(email 미등록) 정보가 등록이 안됨
  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    // cookie에 담을 필요가 있음
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
