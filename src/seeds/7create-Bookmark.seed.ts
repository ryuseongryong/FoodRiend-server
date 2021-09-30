import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Bookmark } from '../entities/Bookmark.entity';

export default class CreateBookmark implements Seeder {
  public async run(factory: Factory, connection: Connection) : Promise<void> {
    await factory(Bookmark)().createMany(15);
  }
}