import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  OneToMany,
} from 'typeorm'
import { DateTime } from 'luxon'
import Phone from './Phone'
import Address from './Address'
import Solicitation from './Solicitation'
import { Length } from 'class-validator'
import { v4 } from 'uuid'

@Entity('ms_clients')
export default class Client extends BaseEntity {
  constructor() {
    super()
    this.id = v4()
  }

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  surname: string

  @Column({ unique: true })
  @Length(12, 12)
  cpf: string

  @CreateDateColumn()
  created_at: DateTime

  @CreateDateColumn()
  updated_at: DateTime

  @OneToOne(() => Address, { cascade: true })
  address: Address

  @OneToMany(() => Phone, (phone) => phone.client, { cascade: true })
  phones: Phone[]

  @OneToOne(() => Solicitation, (solicitation) => solicitation.client, { cascade: true })
  solicitation: Solicitation
}
