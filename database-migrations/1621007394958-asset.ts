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

import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class asset1621007394958 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const assetTable = new Table({
      name: 'asset',
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
          name: 'contributorId',
          type: 'int',
          length: '11',
          unsigned: true,
          isNullable: false,
        },
        {
          name: 'title',
          type: 'tinytext',
          isNullable: true,
        },
        {
          name: 'type',
          type: 'enum',
          enum: ['siir','oyku','deneme','roportaj','elestiri','resim','ses','video'],
          isNullable: false,
        },
        {
          name: 'video',
          type: 'tinytext',
          isNullable: true,
          default: 'NULL',
        },
        {
          name: 'message',
          type: 'text',
          isNullable: false,
        },
        {
          name: 'filename',
          type: 'varchar',
          length: '500',
          isNullable: true,
          default: 'NULL',
        },
        {
          name: 'driveId',
          type: 'varchar',
          length: '50',
          isNullable: true,
          default: 'NULL',
        },
        {
          name: 'driveLink',
          type: 'varchar',
          length: '200',
          isNullable: true,
          default: 'NULL',
        },
        {
          name: 'isUploaded',
          type: 'bit',
          length: '1',
          isNullable: false,
          default: `b'0'`,
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

    await queryRunner.createTable(assetTable, true);

    await queryRunner.createIndex(assetTable, new TableIndex({
      name: 'isUploaded_index',
      columnNames: ['isUploaded'],
    }));

    await queryRunner.createForeignKey(assetTable, new TableForeignKey({
      name: 'FK_asset_contributor',
      referencedTableName: 'contributor',
      referencedColumnNames: ['id'],
      columnNames: ['contributorId'],
      onUpdate: 'no action',
      onDelete: 'restrict',
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('asset');
  }
}
