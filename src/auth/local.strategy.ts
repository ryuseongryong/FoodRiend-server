import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'loginType' });
  }

  // email과 loginType을 받아서 validateUser로 전달
  async validate(email: string, loginType: string): Promise<any> {
    const user = await this.authService.validateUser(email, loginType);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
