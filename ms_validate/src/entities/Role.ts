import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'
import { DateTime } from 'luxon'

@Entity()
export default class Role extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  user_type: string

  @CreateDateColumn()
  createdAt: DateTime

  @CreateDateColumn()
  updatedAt: DateTime
}
