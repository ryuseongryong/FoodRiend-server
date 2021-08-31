import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CatsController } from './cats.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SearchModule } from './search/search.module';
import { BoardModule } from './board/board.module';
import { FriendModule } from './friend/friend.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AppController, CatsController],
  providers: [AppService],
  imports: [
    UsersModule,
    SearchModule,
    BoardModule,
    FriendModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      entities: [],
      synchronize: true,
    }),
  ],
})
export class AppModule {}
