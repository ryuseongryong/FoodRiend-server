import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Write_Board } from '../entities/Write_Board.entity';

export default class CreateWriteBoard implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(Write_Board)().createMany(20);
  }
}