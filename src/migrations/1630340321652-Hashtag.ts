import { MigrationInterface, QueryRunner } from 'typeorm';

export class Hashtag1630340321652 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `Hashtag` (`id` int NOT NULL AUTO_INCREMENT, `write_board_id` int NOT NULL, `tag` varchar(255) NOT NULL, `created_at` datetime NOT NULL, `updated_at` datetime NOT NULL, primary key(id)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
