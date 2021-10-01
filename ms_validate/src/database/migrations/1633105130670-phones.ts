import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class phones1633105130670 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'phones',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'phone',
            type: 'varchar(12)',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'client_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'ClientPhones',
            referencedTableName: 'ms_clients',
            referencedColumnNames: ['id'],
            columnNames: ['client_id'],
            onUpdate: 'SET NULL',
            onDelete: 'CASCADE',
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('phones')
  }
}
