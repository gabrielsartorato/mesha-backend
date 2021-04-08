import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedServicesTableAndProfessional1617852522545
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO users (user_name, password, type) VALUES('Fulano 1', 'teste', 'PROFISSIONAL')",
    );

    await queryRunner.query(
      "INSERT INTO users (user_name, password, type) VALUES('Fulano 2', 'teste', 'PROFISSIONAL')",
    );

    await queryRunner.query(
      "INSERT INTO users (user_name, password, type) VALUES('Fulano 3', 'teste', 'PROFISSIONAL')",
    );

    await queryRunner.query(
      "INSERT INTO users (user_name, password, type) VALUES('Fulano 4', 'teste', 'PROFISSIONAL')",
    );

    await queryRunner.query(
      "INSERT INTO services (name_service, price, minutes) VALUES('Tomografia', '200.00', '10')",
    );

    await queryRunner.query(
      "INSERT INTO services (name_service, price, minutes) VALUES('Exame de Sangue', '20.00', '10')",
    );

    await queryRunner.query(
      "INSERT INTO services (name_service, price, minutes) VALUES('Triagem', '10.00', '05')",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('TRUNCATE TABLE users');
    await queryRunner.query('TRUNCATE TABLE services');
  }
}
