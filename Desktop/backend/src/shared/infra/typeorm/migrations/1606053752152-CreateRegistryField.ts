import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class CreateRegistryField1606053752152
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'employeers',
      new TableColumn({
        name: 'registry',
        type: 'varchar',
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('employeer', 'regisry');
  }
}
