import { DateTime } from 'luxon'
import { column, BaseModel, beforeCreate } from '@ioc:Adonis/Lucid/Orm'
import { v4 as uuidv4 } from 'uuid'

export default class Account extends BaseModel {
  @column({ isPrimary: true })
  public id: string

  @column()
  public current_balance: number

  @column()
  public user_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async generateUuid(account: Account) {
    account.id = uuidv4()
  }
}
