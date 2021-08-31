import { MigrationInterface, QueryRunner } from 'typeorm';

export class UploadImage1630340312236 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `Upload_Image` (`id` int NOT NULL AUTO_INCREMENT, `foodImage` varchar(255) NOT NULL, `write_board_id` int NOT NULL, `house_info_id` int NOT NULL, `created_at` datetime NOT NULL, `updated_at` datetime NOT NULL, primary key(id)) ENGINE=InnoDB',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
