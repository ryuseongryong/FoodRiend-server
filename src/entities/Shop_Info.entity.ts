import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm/index';

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

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
