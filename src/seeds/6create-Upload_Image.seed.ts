import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Upload_Image } from '../entities/Upload_Image.entity';

export default class CreateUploadImage implements Seeder {
  public async run(factory: Factory, connection: Connection) : Promise<void> {
    await factory(Upload_Image)().createMany(50);
  }
}