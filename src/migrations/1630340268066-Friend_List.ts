import { MigrationInterface, QueryRunner } from 'typeorm';

export class FriendList1630340268066 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `Friend_List` (`id` int NOT NULL AUTO_INCREMENT, `user_id` int NOT NULL, `friend` int, `isDeleted` boolean, `created_at` datetime NOT NULL, `updated_at` datetime NOT NULL, primary key(id)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
