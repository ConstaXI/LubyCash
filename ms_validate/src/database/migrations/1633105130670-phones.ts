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
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'phone',
            type: 'varchar(14)',
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
            name: 'clientId',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'ClientPhones',
            referencedTableName: 'ms_clients',
            referencedColumnNames: ['id'],
            columnNames: ['clientId'],
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
