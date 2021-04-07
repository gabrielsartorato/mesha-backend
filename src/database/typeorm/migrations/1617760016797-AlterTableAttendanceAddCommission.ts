import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterTableAttendanceAddCommission1617760016797
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'attendances',
      new TableColumn({
        name: 'commission',
        type: 'decimal',
        scale: 2,
        precision: 10,
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('attendances', 'commission');
  }
}
