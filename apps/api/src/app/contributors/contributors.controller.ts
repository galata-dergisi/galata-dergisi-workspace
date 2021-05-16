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

import { Controller, Get } from '@nestjs/common';
import { Contributor } from './contributor.entity';
import { ContributorsService } from './contributors.service';

@Controller()
export class ContributorsController {
  constructor(private readonly contributorsService: ContributorsService) {}

  @Get('contributors')
  getData(): Promise<Contributor[]> {
    return this.contributorsService.findAll();
  }
}
