import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm'
import { DateTime } from 'luxon'
import User from './User'

@Entity()
export default class Phone extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  phone: string

  @Column()
  user_id: string

  @CreateDateColumn()
  createdAt: DateTime

  @CreateDateColumn()
  updatedAt: DateTime

  @ManyToOne(() => User, (user) => user.phones)
  user: User
}
