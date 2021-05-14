// Copyright 2021 Mehmet Baker
//
// This file is part of galata-dergisi-workspace.
//
// galata-dergisi-workspace is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// galata-dergisi-workspace is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with galata-dergisi-workspace. If not, see <https://www.gnu.org/licenses/>.

import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex, TableUnique } from 'typeorm';

export class page1621005516513 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const pageTable = new Table({
      name: 'page',
      columns: [
        {
          name: 'id',
          type: 'int',
          length: '11',
          unsigned: true,
          isPrimary: true,
          generationStrategy: 'increment',
          isGenerated: true,
          isNullable: false,
        },
        {
          name: 'magazineIndex',
          type: 'int',
          length: '11',
          unsigned: true,
          isNullable: false,
        },
        {
          name: 'pageNumber',
          type: 'int',
          length: '11',
          unsigned: true,
          isNullable: false,
        },
        {
          name: 'content',
          type: 'text',
          isNullable: false,
          default: `''`,
        },
        {
          name: 'createdAt',
          type: 'timestamp',
          isNullable: false,
          default: 'current_timestamp()',
        },
        {
          name: 'updatedAt',
          type: 'timestamp',
          isNullable: true,
          default: 'NULL',
          onUpdate: 'current_timestamp()',
        },
      ],
    });

    await queryRunner.createTable(pageTable, true);

    await queryRunner.createIndex(pageTable, new TableIndex({
      name: 'unique_magazineIndex_pageNumber',
      columnNames: ['magazineIndex', 'pageNumber'],
      isUnique: true,
    }));

    await queryRunner.createForeignKey(pageTable, new TableForeignKey({
      name: 'FK_page_magazine',
      referencedTableName: 'magazine',
      referencedColumnNames: ['id'],
      columnNames: ['magazineIndex'],
      onUpdate: 'no action',
      onDelete: 'restrict',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('page');
  }
}
