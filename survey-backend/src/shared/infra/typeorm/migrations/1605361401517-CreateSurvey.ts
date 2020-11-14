import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateSurvey1605361401517 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'survey',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'vehicle_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'last_survey',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'note',
            type: 'varchar',
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
      'survey',
      new TableForeignKey({
        name: 'VehicleSurvey',
        columnNames: ['vehicle_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'vehicle',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('survey', 'VehicleSurvey');
    await queryRunner.dropTable('survey');
  }
}
