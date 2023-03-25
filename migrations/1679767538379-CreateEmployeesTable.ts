import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateEmployeesTable1679767538379 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await await queryRunner.query(`
  CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    salary INT NOT NULL,
    assignedRecruiter INT NOT NULL,
    PRIMARY KEY (id)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
`);
  }
  public async down(queryRunner: QueryRunner): Promise<void> {}
}
