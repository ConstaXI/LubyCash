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

@Entity('phones')
export default class Phone extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  phone: string

  @Column()
  user_id: string

  @CreateDateColumn()
  created_at: DateTime

  @CreateDateColumn()
  updated_at: DateTime

  @ManyToOne(() => User)
  user: User
}
