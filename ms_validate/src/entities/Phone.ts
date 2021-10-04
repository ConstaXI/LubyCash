import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm'
import { DateTime } from 'luxon'
import Client from './Client'

@Entity('phones')
export default class Phone extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  phone: string

  @Column()
  clientId: string

  @CreateDateColumn()
  created_at: DateTime

  @CreateDateColumn()
  updated_at: DateTime

  @ManyToOne(() => Client)
  client: Client
}
