import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Hashtag } from '../entities/Hashtag.entity';
export default class CreateHashtag implements Seeder {
  public async run(factory: Factory, connection: Connection) : Promise<void> {
    await factory(Hashtag)().createMany(50);
  }
}