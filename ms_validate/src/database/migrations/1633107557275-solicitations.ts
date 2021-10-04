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
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'average_income',
            type: 'float',
          },
          {
            name: 'status',
            type: 'varchar',
            default: "'waiting'",
          },
          {
            name: 'clientId',
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
            columnNames: ['clientId'],
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
