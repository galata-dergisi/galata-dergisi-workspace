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

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contributor } from './contributor.entity';

@Injectable()
export class ContributorsService {
  constructor(
    @InjectRepository(Contributor)
    private contributorsRepository: Repository<Contributor>,
  ) {}

  findAll(): Promise<Contributor[]> {
    return this.contributorsRepository.find();
  }

  findOne(id: number): Promise<Contributor> {
    return this.contributorsRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.contributorsRepository.delete(id);
  }
}
