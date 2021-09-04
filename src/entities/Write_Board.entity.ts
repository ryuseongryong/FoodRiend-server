import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm/index';
import { Hashtag } from './Hashtag.entity';
import { Join_T } from './Join_T.entity';
import { Shop_Info } from './Shop_Info.entity';
import { Upload_Image } from './Upload_Image.entity';
import { Users } from './Users.entity';

@Entity()
export class Write_Board {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  join_t_id: number;

  @Column()
  rating: number;

  @Column({ default: false })
  best: boolean;

  @Column()
  comments: string;

  @Column({ default: false })
  isDeleted: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Users, (users) => users.id, {
    cascade: ['remove', 'update'],
  })
  users: Users;

  @ManyToMany(() => Shop_Info, { cascade: ['remove', 'update'] })
  @JoinTable({ name: 'Join_T' })
  joinT: Join_T[];

  @OneToMany(() => Hashtag, (hashtag) => hashtag.write_board_id, {
    cascade: ['remove', 'update'],
  })
  hashtag: Hashtag[];

  @ManyToMany(() => Shop_Info, { cascade: ['remove', 'update'] })
  @JoinTable({ name: 'Upload_Image' })
  images: Upload_Image[];
}
