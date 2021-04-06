import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AlterTableServicesToAddForeignKey1617677041067
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'services',
      new TableForeignKey({
        name: 'AttendanceForeignKey',
        columnNames: ['id_attendance'],
        referencedColumnNames: ['id'],
        referencedTableName: 'attendances',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('services', 'AttendanceForeignKey');
  }
}
