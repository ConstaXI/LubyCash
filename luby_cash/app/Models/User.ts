import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasOne,
  HasOne,
  hasMany,
  HasMany,
  beforeCreate,
} from '@ioc:Adonis/Lucid/Orm'
import Address from 'App/Models/Address'
import Phone from 'App/Models/Phone'
import Role from 'App/Models/Role'
import { v4 as uuidv4 } from 'uuid'
import Solicitation from 'App/Models/Solicitation'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public name: string

  @column()
  public surname: string

  @column()
  public cpf: string

  @column()
  public rememberMeToken?: string

  @hasOne(() => Address, { foreignKey: 'user_id' })
  public address: HasOne<typeof Address>

  @hasMany(() => Phone, { foreignKey: 'user_id' })
  public phones: HasMany<typeof Phone>

  @hasOne(() => Role, { foreignKey: 'user_id' })
  public role: HasOne<typeof Role>

  @hasOne(() => Solicitation, { foreignKey: 'user_id' })
  public solicitation: HasOne<typeof Solicitation>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeCreate()
  public static async generateUuid(user: User) {
    user.id = uuidv4()
  }
}
