import { MigrationInterface, QueryRunner } from 'typeorm';

export class createEmployeesTable1679607254432 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log('helllo');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
