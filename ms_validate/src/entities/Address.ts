import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'
import { DateTime } from 'luxon'

@Entity()
export default class Address extends BaseEntity {
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
}
