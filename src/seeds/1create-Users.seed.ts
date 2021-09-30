import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Users } from '../entities/Users.entity';
import Faker from 'faker';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(Users)().createMany(11);
  }
}

// export default class CreateUsers implements Seeder {
//   public async run(factory: Factory, connection: Connection): Promise<any> {
//     const userData = [
//       {
//         name: 'ryu',
//         nickname: 'rsr',
//         password: '1234',
//         profileImage: 'profile1',
//         phoneNumber: '010-1111-1111',
//         foodType: 'foodType1',
//         foodStyle: 'foodStyle1',
//       },
//     ];
//     await connection
//     .createQueryBuilder()
//     .insert()
//     .into(Users)
//     .values(userData).execute()
//   }
// }
