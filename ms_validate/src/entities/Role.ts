import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'
import { DateTime } from 'luxon'

@Entity('roles')
export default class Role extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  user_type: string

  @Column()
  user_id: string

  @CreateDateColumn()
  created_at: DateTime

  @CreateDateColumn()
  updated_at: DateTime
}
