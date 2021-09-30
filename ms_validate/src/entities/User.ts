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
import Role from './Role'
import Phone from './Phone'
import Address from './Address'
import Account from './Account'
import Solicitation from '../../../luby_cash/app/Models/Solicitation'

@Entity()
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @Column()
  surname: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ unique: true })
  cpf: string

  @CreateDateColumn()
  createdAt: DateTime

  @CreateDateColumn()
  updatedAt: DateTime

  @OneToOne(() => Role)
  role: Role

  @OneToOne(() => Address)
  address: Address

  @OneToMany(() => Phone, (phone) => phone.user)
  phones: Phone[]

  @OneToOne(() => Account)
  account: Account

  @OneToOne(() => Solicitation)
  solicitation: Solicitation
}
