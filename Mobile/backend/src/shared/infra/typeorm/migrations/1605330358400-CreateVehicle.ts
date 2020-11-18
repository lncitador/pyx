import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateVehicle1605330358400 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'vehicle',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'plate',
            type: 'varchar',
          },
          {
            name: 'driver',
            type: 'varchar',
          },
          {
            name: 'carrier_id',
            type: 'uuid',
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

    await queryRunner.createForeignKey(
      'vehicle',
      new TableForeignKey({
        name: 'TranscarrierVehicle',
        columnNames: ['carrier_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'carrier',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('vehicle', 'TranscarrierVehicle');
    await queryRunner.dropTable('vehicle');
  }
}
