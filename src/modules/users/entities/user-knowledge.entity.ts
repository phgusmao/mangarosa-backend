import {
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  Column,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { UserEntity } from './user.entity';

@Entity({ name: 'user_knowledges' })
export class UserKnowledgeEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name: string;

  @Column({ name: 'user_id' })
  userId: boolean;

  @ManyToOne(() => UserEntity, (user) => user.knowledges)
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt?: Date;
}
