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

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContributorDTO } from '@galata-dergisi/api-interfaces';
import { Repository } from 'typeorm';
import { Contributor } from './contributor.entity';

@Injectable()
export class ContributorsService {
  constructor(
    @InjectRepository(Contributor)
    private contributorsRepository: Repository<Contributor>
  ) {}

  getAllContributors(): Promise<Contributor[]> {
    return this.contributorsRepository.find();
  }

  getContributorById(id: number): Promise<Contributor> {
    return this.contributorsRepository.findOne(id);
  }

  async removeContributorById(id: number): Promise<boolean> {
    const result = await this.contributorsRepository.delete(id);
    return result.affected === 1;
  }

  createContributor(contributorDTO: ContributorDTO): Promise<Contributor> {
    const contributor = new Contributor(contributorDTO.nickName, contributorDTO.email);
    return this.contributorsRepository.save(contributor);
  }

  async updateContributorById(contributorId: number, contributorDTO: ContributorDTO): Promise<Contributor> {
    const contributor = await this.contributorsRepository.findOne(contributorId);
    if (!contributor) {
      return null;
    }

    contributor.nickName = contributorDTO.nickName;
    contributor.email = contributorDTO.email;
    return this.contributorsRepository.save(contributor);
  }
}
