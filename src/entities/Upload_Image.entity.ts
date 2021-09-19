import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm/index';
import { Shop_Info } from './Shop_Info.entity';
import { Write_Board } from './Write_Board.entity';

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

  @ManyToOne(() => Write_Board)
  @JoinColumn({ name: 'write_board_id' })
  writeBoard: Write_Board[];

  @ManyToOne(() => Shop_Info)
  @JoinColumn({ name: 'house_info_id' })
  shopInfo: Shop_Info;
}
