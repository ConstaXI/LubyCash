import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'
import { DateTime } from 'luxon'

@Entity('addresses')
export default class Address extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  zip_code: string

  @Column()
  city: string

  @Column()
  state: string

  @Column()
  clientId: string

  @CreateDateColumn()
  created_at: DateTime

  @CreateDateColumn()
  updated_at: DateTime
}
