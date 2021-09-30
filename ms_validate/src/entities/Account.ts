import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'
import { DateTime } from 'luxon'
import { v4 } from 'uuid'

@Entity('accounts')
export default class Account extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  current_balance: number

  @Column()
  user_id: string

  @CreateDateColumn()
  created_at: DateTime

  @CreateDateColumn()
  updated_at: DateTime

  constructor() {
    super()
    this.id = v4()
  }
}
