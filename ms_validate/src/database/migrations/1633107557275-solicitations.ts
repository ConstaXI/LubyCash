import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class solicitations1633107557275 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'solicitations',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'average_income',
            type: 'float',
          },
          {
            name: 'client_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'ClientSolicitations',
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
    await queryRunner.dropTable('solicitations')
  }
}
