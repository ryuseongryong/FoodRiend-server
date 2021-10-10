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
import { Bookmark } from './Bookmark.entity';
import { Upload_Image } from './Upload_Image.entity';
import { Write_Board } from './Write_Board.entity';

@Entity()
export class Shop_Info {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mainImage: string;

  @Column()
  foodCategory: string;

  @Column({
    nullable: true,
  })
  menu: string;

  @Column({ default: 0 })
  aveRating: number;

  @Column({ nullable: true })
  contact: string;

  @Column({ unique: true })
  title: string;

  @Column()
  location: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Write_Board, (writeBoard) => writeBoard.shopInfo)
  writeBoard: Write_Board[];

  @OneToMany(() => Upload_Image, (uploadImage) => uploadImage.shopInfo)
  img: Upload_Image[];

  @OneToMany(() => Bookmark, (bookmark) => bookmark.shopInfo)
  bookmark: Bookmark[];
}
