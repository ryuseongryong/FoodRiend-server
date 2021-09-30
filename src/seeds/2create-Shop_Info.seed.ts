import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Shop_Info } from '../entities/Shop_Info.entity';


export default class CreateShopInfo implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(Shop_Info)().createMany(11);
  }
}