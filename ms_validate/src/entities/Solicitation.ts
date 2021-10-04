import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'
import { DateTime } from 'luxon'

@Entity('solicitations')
export default class Solicitation extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  status: string

  @Column()
  average_income: number

  @Column()
  clientId: string

  @CreateDateColumn()
  created_at: DateTime
}
