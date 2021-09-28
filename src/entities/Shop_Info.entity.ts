import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm/index';
import { Write_Board } from './Write_Board.entity';

@Entity()
export class Shop_Info {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mainImage: string;

  @Column()
  foodCategory: string;

  @Column()
  menu: string;

  @Column()
  aveRating: number;

  @Column()
  contact: string;

  @Column()
  title: string;

  @Column()
  location: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Write_Board, (writeBoard) => writeBoard.shopInfo)
  shopInfo: Shop_Info[];
}
