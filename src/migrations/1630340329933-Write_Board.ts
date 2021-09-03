import { MigrationInterface, QueryRunner } from 'typeorm';

export class WriteBoard1630340329933 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `Write_Board` (`id` int NOT NULL AUTO_INCREMENT, `user_id` int NOT NULL, `join_t_id` int NOT NULL, `rating` int NOT NULL, `best` boolean,`comments` varchar(2000), `isDeleted` boolean NOT NULL ,`created_at` datetime NOT NULL, `updated_at` datetime NOT NULL, primary key(id)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
