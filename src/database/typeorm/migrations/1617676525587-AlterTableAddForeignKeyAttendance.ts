import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AlterTableAddForeignKeyAttendance1617676525587
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'attendances',
      new TableForeignKey({
        name: 'UserForeignKey',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('attendances', 'UserForeignKey');
  }
}
