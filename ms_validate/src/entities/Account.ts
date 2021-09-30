import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'
import { DateTime } from 'luxon'

@Entity()
export default class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  current_balance: number

  @CreateDateColumn()
  createdAt: DateTime

  @CreateDateColumn()
  updatedAt: DateTime
}
