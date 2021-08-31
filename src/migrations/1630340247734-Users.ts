import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1630340247734 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `Users` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(50) NOT NULL, `nickname` varchar(50) NOT NULL, `password` varchar(50) NOT NULL, `profileImage` varchar(255), `phoneNumber` varchar(50) NOT NULL, `foodType` varchar(50) NOT NULL, `foodStyle` varchar(50) NOT NULL, `isDeleted` boolean, `created_at` datetime NOT NULL, `updated_at` datetime NOT NULL, primary key(id)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
