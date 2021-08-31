import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm/index';

@Entity()
export class Upload_Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  foodImage: string;

  @Column()
  write_board_id: number;

  @Column()
  house_info_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
