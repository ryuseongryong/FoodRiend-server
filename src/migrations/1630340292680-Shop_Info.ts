import { MigrationInterface, QueryRunner } from 'typeorm';

export class ShopInfo1630340292680 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `Shop_Info` (`id` int NOT NULL AUTO_INCREMENT, `mainImage` varchar(255), `foodCategory` varchar(50), `menu` varchar(255),`aveRating` int ,`contact` varchar(50),`created_at` datetime NOT NULL, `updated_at` datetime NOT NULL, primary key(id)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
