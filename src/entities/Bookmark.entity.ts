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
import { Users } from './Users.entity';

@Entity()
export class Bookmark {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  house_info_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'user_id' })
  user!: Users;

  @ManyToOne(() => Shop_Info)
  @JoinColumn({ name: 'house_info_id' })
  shopInfo!: Shop_Info;
}
