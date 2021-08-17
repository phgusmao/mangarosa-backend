import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableUsers1629208145328 implements MigrationInterface {
  private userTable = new Table({
    name: 'users',
    columns: [
      {
        name: 'id',
        type: 'INTEGER',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
      },
      {
        name: 'name',
        type: 'VARCHAR',
        length: '255',
      },
      {
        name: 'cpf',
        type: 'VARCHAR',
        length: '11',
        isUnique: true,
      },
      {
        name: 'phone_number',
        type: 'VARCHAR',
        length: '255',
      },
      {
        name: 'email',
        type: 'VARCHAR',
        length: '255',
        isUnique: true,
      },
      {
        name: 'status',
        type: 'BOOLEAN',
        isNullable: true,
      },
      {
        name: 'created_at',
        type: 'TIMESTAMP',
        default: 'NOW()',
      },
      {
        name: 'updated_at',
        type: 'TIMESTAMP',
        default: 'NOW() ON UPDATE CURRENT_TIMESTAMP()',
      },
      {
        name: 'deleted_at',
        type: 'TIMESTAMP',
        isNullable: true,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.userTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.userTable);
  }
}
