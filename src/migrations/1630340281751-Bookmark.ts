import { MigrationInterface, QueryRunner } from 'typeorm';

export class Bookmark1630340281751 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `Bookmark` (`id` int NOT NULL AUTO_INCREMENT, `user_id` int NOT NULL, `house_info_id` int NOT NULL, `created_at` datetime NOT NULL, `updated_at` datetime NOT NULL, primary key(id)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
