import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Phones extends BaseSchema {
  protected tableName = 'phones'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id')
      table.string('phone').unique().notNullable()
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