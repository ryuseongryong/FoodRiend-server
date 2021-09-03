import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm/index';

@Entity()
export class Join_T {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  location: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
