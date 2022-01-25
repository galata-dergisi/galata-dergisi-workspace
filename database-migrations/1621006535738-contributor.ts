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

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class contributor1621006535738 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const contributorTable = new Table({
      name: 'contributor',
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
          name: 'nickname',
          type: 'tinytext',
          isNullable: false,
        },
        {
          name: 'email',
          type: 'tinytext',
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

    await queryRunner.createTable(contributorTable, true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('contributor');
  }
}
