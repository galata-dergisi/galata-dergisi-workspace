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

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Contributor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nickName: string;

  @Column({ default: null })
  email: string|null;

  @Column({ default: new Date() })
  createdAt: Date;

  @Column({ default: null })
  updatedAt: Date|null;
}
