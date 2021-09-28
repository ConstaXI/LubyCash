import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'
import User from 'App/Models/User'

export default class Solicitation extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public average_income: number

  @column()
  public status: string

  @column()
  public account_type: string

  @column()
  public user_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @beforeCreate()
  public static async generateUuid(solicitation: Solicitation) {
    solicitation.id = uuidv4()
  }
}
