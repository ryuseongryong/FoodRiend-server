// import { MigrationInterface, QueryRunner } from 'typeorm';

// export class Users1630340247734 implements MigrationInterface {
//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(
//       'CREATE TABLE `Users` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(50) NOT NULL, `nickname` varchar(50) NOT NULL, `password` varchar(50) NOT NULL, `profileImage` varchar(255), `phoneNumber` varchar(50) NOT NULL, `foodType` varchar(50) NOT NULL, `foodStyle` varchar(50) NOT NULL, `isDeleted` boolean, `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` datetime  NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, primary key(id)) ENGINE=InnoDB CHARACTER SET utf8',
//     );
//     await queryRunner.query(
//       'CREATE TABLE `Friend_List` (`id` int NOT NULL AUTO_INCREMENT, `user_id` int NOT NULL, `friend` int, `isDeleted` boolean, `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` datetime  NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP , primary key(id), constraint Friend_List_Users foreign key (user_id) references Users(id) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB CHARACTER SET utf8',
//     );

//     await queryRunner.query(
//       'CREATE TABLE `Shop_Info` (`id` int NOT NULL AUTO_INCREMENT, `mainImage` varchar(255), `foodCategory` varchar(50), `menu` varchar(255),`aveRating` int ,`contact` varchar(50),`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, primary key(id)) ENGINE=InnoDB CHARACTER SET utf8',
//     );

//     await queryRunner.query(
//       'CREATE TABLE `Bookmark` (`id` int NOT NULL AUTO_INCREMENT, `user_id` int NOT NULL, `house_info_id` int NOT NULL, `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, primary key(id), constraint Bookmark_Users foreign key (user_id) references Users(id) ON DELETE CASCADE ON UPDATE CASCADE, constraint Bookmark_Shop_Info foreign key (house_info_id) references Shop_Info(id) ON DELETE CASCADE ON UPDATE CASCADE, constraint Bookmark_unique unique (user_id, house_info_id) ) ENGINE=InnoDB CHARACTER SET utf8',
//     );

//     await queryRunner.query(
//       'CREATE TABLE `Join_T` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `location` varchar(255) NOT NULL, `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, primary key(id), constraint Join_T_Shop_Info foreign key (id) references Shop_Info(id) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB CHARACTER SET utf8',
//     );

//     await queryRunner.query(
//       'CREATE TABLE `Write_Board` (`id` int NOT NULL AUTO_INCREMENT, `user_id` int NOT NULL, `join_t_id` int NOT NULL, `rating` int NOT NULL, `best` boolean,`comments` varchar(2000), `isDeleted` boolean NOT NULL ,`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, primary key(id), constraint Write_Board_Join_T foreign key (join_t_id) references Join_T(id) ON DELETE CASCADE ON UPDATE CASCADE, constraint Write_Board_Users foreign key (user_id) references Users(id) ON DELETE CASCADE ON UPDATE CASCADE ) ENGINE=InnoDB CHARACTER SET utf8',
//     );

//     await queryRunner.query(
//       'CREATE TABLE `Hashtag` (`id` int NOT NULL AUTO_INCREMENT, `write_board_id` int NOT NULL, `tag` varchar(255) NOT NULL, `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, primary key(id), constraint Hashtage_Write_Board foreign key (write_board_id) references Write_Board(id) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB CHARACTER SET utf8',
//     );

//     await queryRunner.query(
//       'CREATE TABLE `Upload_Image` (`id` int NOT NULL AUTO_INCREMENT, `foodImage` varchar(255) NOT NULL, `write_board_id` int NOT NULL, `house_info_id` int NOT NULL, `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP, `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, primary key(id), constraint Upload_Image_Write_Board foreign key (write_board_id) references Write_Board(id) ON DELETE CASCADE ON UPDATE CASCADE, constraint Upload_Image_Shop_Info foreign key (house_info_id) references Shop_Info(id) ON DELETE CASCADE ON UPDATE CASCADE, constraint Upload_Image_unique unique (write_board_id, house_info_id) ) ENGINE=InnoDB CHARACTER SET utf8',
//     );
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {}
// }
