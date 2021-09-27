import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'

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

  @beforeCreate()
  public static async generateUuid(solicitation: Solicitation) {
    solicitation.id = uuidv4()
  }
}
