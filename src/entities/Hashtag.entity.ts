import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm/index';

@Entity()
export class Hashtag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  write_board_id: number;

  @Column()
  tag: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
