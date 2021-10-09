import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Friend_List } from '../entities/Friend_List.entity';

export default class CreateFriendList implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(Friend_List)().createMany(20);
  }
}
