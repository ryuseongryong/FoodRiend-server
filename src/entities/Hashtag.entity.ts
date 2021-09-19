import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm/index';
import { Write_Board } from './Write_Board.entity';

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

  @ManyToOne(() => Write_Board)
  @JoinColumn({
    name: 'write_board_id',
    referencedColumnName: 'id',
  })
  writeBoard: Write_Board;
}
