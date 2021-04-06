import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableAttendace1617675109433 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'attendances',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            generationStrategy: 'increment',
            isGenerated: true,
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'total_price',
            type: 'decimal',
            scale: 2,
            precision: 10,
            isNullable: true,
          },
          {
            name: 'start_service',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'end_service',
            type: 'timestamp',
            isNullable: true,
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
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('attendances');
  }
}
