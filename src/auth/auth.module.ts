import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { Bookmark } from '../entities/Bookmark.entity';
import { Friend_List } from '../entities/Friend_List.entity';
import { Hashtag } from '../entities/Hashtag.entity';
import { Users } from '../entities/Users.entity';
import { Write_Board } from '../entities/Write_Board.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('ACCESS_SECRET'),
        signOptions: { expiresIn: '6000s' },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([
      Users,
      Friend_List,
      Write_Board,
      Bookmark,
      Hashtag,
    ]),
  ],
  providers: [AuthService, LocalStrategy, UsersService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
