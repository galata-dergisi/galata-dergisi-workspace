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

import { Test, TestingModule } from '@nestjs/testing';
import { ContributorDTO } from '@galata-dergisi/api-interfaces';

import { Contributor } from './contributor.entity';
import { ContributorsController } from './contributors.controller';
import { ContributorsService } from './contributors.service';

describe('ContributorsController', () => {
  let controller: ContributorsController;
  let service: ContributorsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContributorsController],
      providers: [
        {
          provide: ContributorsService,
          useValue: {
            getAllContributors: jest.fn(),
            getContributorById: jest.fn(),
            removeContributorById: jest.fn(),
            createContributor: jest.fn().mockImplementation((contributor: ContributorDTO) => {
              return Promise.resolve({
                id: 1,
                ...contributor,
              });
            }),
            updateContributorById: jest.fn().mockImplementation((contributorId: number, contributor: ContributorDTO) => {
              return Promise.resolve({
                id: contributorId,
                ...contributor,
              });
            }),
          },
        },
      ],
    }).compile();

    service = module.get<ContributorsService>(ContributorsService);
    controller = module.get<ContributorsController>(ContributorsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET /contributors', () => {
    it('should return an empty array when there are no entries', async () => {
      const spy = jest.spyOn(service, 'getAllContributors').mockResolvedValue([]);
      const data = await controller.getContributors();
      expect(data).toEqual([]);
      expect(spy).toBeCalledTimes(1);
    });

    it('should return an array of contributors', async () => {
      const mockData = [
        { ...new Contributor('Contributor 1') },
        { ...new Contributor('Contributor 2') },
      ];
      const spy = jest.spyOn(service, 'getAllContributors').mockResolvedValue(mockData);
      const data = await controller.getContributors();
      expect(data).toEqual(mockData);
      expect(spy).toBeCalledTimes(1);
    });
  });

  describe('POST /contributors', () => {
    it('should create a contributor', async () => {
      const newContributor = new ContributorDTO();
      newContributor.nickName = 'Contributor 1';

      const spy = jest.spyOn(service, 'createContributor');
      await expect(controller.postContributors(newContributor)).resolves.toEqual({
        id: 1,
        ...newContributor,
      });
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(newContributor);
    });
  });

  describe('PUT /contributors', () => {
    it('should return updated contributor', async () => {
      const contributorId = 5;
      const contributor = new ContributorDTO();
      contributor.nickName = 'Jane Doe';
      contributor.email = 'jane.doe@example.com';

      const spy = jest.spyOn(service, 'updateContributorById');
      await expect(controller.putContributor(contributorId, contributor)).resolves.toEqual({
        id: contributorId,
        ...contributor,
      });
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(contributorId, contributor);
    });
  });

  describe('DELETE /contributors', () => {
    it('should delete contributor by given id', async () => {
      const id = 5;
      const spy = jest.spyOn(service, 'removeContributorById').mockResolvedValue(true);
      await expect(controller.deleteContributor(id)).resolves.toBeTruthy();
      expect(spy).toBeCalledTimes(1);
      expect(spy).toBeCalledWith(id);
    });
  });
});
