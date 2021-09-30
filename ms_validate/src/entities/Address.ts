import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'
import { DateTime } from 'luxon'

@Entity('addresses')
export default class Address extends BaseEntity {
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
}
