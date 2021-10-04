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
import { IsEmail, Length } from 'class-validator'

@Entity('ms_clients')
export default class Client extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  surname: string

  @Column({ unique: true })
  @IsEmail()
  email: string

  @Column()
  password: string

  @Column({ unique: true })
  @Length(12, 12)
  cpf: string

  @CreateDateColumn()
  created_at: DateTime

  @CreateDateColumn()
  updated_at: DateTime

  @OneToOne(() => Address, { eager: true })
  address: Address

  @OneToMany(() => Phone, (phone) => phone.client, { eager: true })
  phones: Phone[]

  @OneToOne(() => Solicitation, { eager: true })
  solicitation: Solicitation
}
