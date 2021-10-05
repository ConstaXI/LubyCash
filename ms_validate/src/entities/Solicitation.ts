import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm'
import { DateTime } from 'luxon'
import Client from './Client'

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

  @OneToOne(() => Client, (client) => client.solicitation)
  @JoinColumn()
  client: Client

  @CreateDateColumn()
  created_at: DateTime
}
