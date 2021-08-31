import { MigrationInterface, QueryRunner } from 'typeorm';

export class JoinT1630340300632 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `Join_T` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `location` varchar(255) NOT NULL, `created_at` datetime NOT NULL, `updated_at` datetime NOT NULL, primary key(id)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
