import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserSolicitations extends BaseSchema {
  protected tableName = 'solicitations'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.float('average_income').notNullable()
      table.enum('status', ['waiting', 'approved', 'disapproved']).notNullable()
      table.enum('account_type', ['checking account', 'savings account'])
      table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
