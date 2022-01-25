/**
 * Copyright 2021 Mehmet Baker
 *
 * This file is part of galata-dergisi-workspace.
 *
 * galata-dergisi-workspace is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * galata-dergisi-workspace is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with galata-dergisi-workspace. If not, see <https://www.gnu.org/licenses/>.
 */

import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class magazines1620996160164 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const magazineTable = new Table({
      name: 'magazine',
      columns: [
        {
          name: 'id',
          type: 'int',
          length: '11',
          unsigned: true,
          isPrimary: true,
          generationStrategy: 'increment',
          isGenerated: true,
        },
        {
          name: 'publishDateText',
          type: 'varchar',
          length: '50',
          isNullable: false,
          default: `''`,
        },
        {
          name: 'thumbnailURL',
          type: 'TINYTEXT',
          isNullable: true,
          default: `NULL`,
        },
        {
          name: 'tableOfContents',
          type: 'tinyint',
          length: '4',
          isNullable: false,
          default: '5',
        },
        {
          name: 'visible',
          type: 'tinyint',
          length: '1',
          isNullable: false,
          default: '1',
        },
        {
          name: 'publishDate',
          type: 'timestamp',
          isNullable: true,
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

    await queryRunner.createTable(magazineTable, true);

    await queryRunner.createIndex('magazine', new TableIndex({
      columnNames: ['publishDate'],
    }));

    await queryRunner.createIndex('magazine', new TableIndex({
      columnNames: ['visible'],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('magazine');
  }
}
