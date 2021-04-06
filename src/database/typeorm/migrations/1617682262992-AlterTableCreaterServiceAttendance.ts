import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class AlterTableCreaterServiceAttendance1617682262992
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'services_order',
      new TableForeignKey({
        name: 'AttendanceForeignKey',
        columnNames: ['id_attendance'],
        referencedColumnNames: ['id'],
        referencedTableName: 'attendances',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'services_order',
      new TableForeignKey({
        name: 'ServiceForeignKey',
        columnNames: ['id_service'],
        referencedColumnNames: ['id'],
        referencedTableName: 'services',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('services_order', 'AttendanceForeignKey');
    await queryRunner.dropForeignKey('services_order', 'ServiceForeignKey');
  }
}
