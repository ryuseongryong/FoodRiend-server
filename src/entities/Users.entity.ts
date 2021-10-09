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

  @Column({ type: 'bigint', unique: true })
  kakaoId: bigint;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column()
  loginType: string;

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true, nullable: true })
  nickname: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  profileImage: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  foodType: string;

  @Column({ nullable: true })
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
