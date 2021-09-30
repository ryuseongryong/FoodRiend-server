import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm/index';
import { Friend_List } from './Friend_List.entity';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  nickname: string;

  @Column()
  password: string;

  @Column()
  profileImage: string;

  @Column()
  phoneNumber: string;

  @Column()
  foodType: string;

  @Column()
  foodStyle: string;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Friend_List, (friendList) => friendList.user)
  friendList: Friend_List[];
}
