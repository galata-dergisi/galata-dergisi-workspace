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

import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Contributor } from './contributor.entity';

import { ContributorsService } from './contributors.service';
import { ContributorDTO } from '@galata-dergisi/api-interfaces';

describe('ContributorsService', () => {
  let service: ContributorsService;
  let repo: Repository<Contributor>;

  const contributors: Contributor[] = [
    {
      id: 1,
      nickName: 'Contributor 1',
      email: 'contributor1@example.com',
      createdAt: new Date(),
      updatedAt: null,
    },
    {
      id: 2,
      nickName: 'Contributor 2',
      email: 'contributor2@example.com',
      createdAt: new Date(),
      updatedAt: null,
    },
    {
      id: 3,
      nickName: 'Contributor 3',
      email: 'contributor3@example.com',
      createdAt: new Date(),
      updatedAt: null,
    },
    {
      id: 4,
      nickName: 'Contributor 4',
      email: 'contributor4@example.com',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  let data: Contributor[];

  beforeEach(async () => {
    data = JSON.parse(JSON.stringify(contributors)).map((contributor) => {
      contributor.createdAt = new Date(contributor.createdAt);

      if (contributor.updatedAt) {
        contributor.updatedAt = new Date(contributor.updatedAt);
      }

      return contributor;
    });
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContributorsService,
        {
          provide: getRepositoryToken(Contributor),
          useValue: {
            find: jest.fn().mockResolvedValue(data),
            findOne: jest.fn().mockImplementation((id: number) => {
              return Promise.resolve(data.find((c) => c.id === id));
            }),
            save: jest.fn().mockImplementation(
              (contributor): Promise<Contributor> => {
                let dbContributor: Contributor = data.find(
                  (c) => c.id === contributor.id
                );
                if (dbContributor) {
                  if (contributor.nickName) {
                    dbContributor.nickName = contributor.nickName;
                  }

                  if (contributor.email) {
                    dbContributor.email = contributor.email;
                  }

                  dbContributor.updatedAt = new Date();
                  return Promise.resolve(dbContributor);
                }

                dbContributor = {
                  id: data.length + 1,
                  nickName: contributor.nickName,
                  email: contributor.email || null,
                  createdAt: new Date(),
                  updatedAt: null,
                };
                data.push(dbContributor);
                return Promise.resolve(dbContributor);
              }
            ),
            delete: jest.fn().mockImplementation(
              (id: number): Promise<{ affected: number }> => {
                const index = data.findIndex((c) => c.id === id);
                if (index === -1) {
                  return Promise.resolve({ affected: 0 });
                }

                data.splice(index, 1);
                return Promise.resolve({ affected: 1 });
              }
            ),
          },
        },
      ],
    }).compile();

    service = module.get<ContributorsService>(ContributorsService);
    repo = module.get<Repository<Contributor>>(getRepositoryToken(Contributor));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repo).toBeDefined();
  });

  it('should retrieve all records', async () => {
    await expect(service.getAllContributors()).resolves.toEqual(contributors);
  });

  it('should return a single contributor', async () => {
    const repoSpy = jest.spyOn(repo, 'findOne');
    await expect(service.getContributorById(1)).resolves.toEqual(
      contributors[0]
    );
    expect(repoSpy).toBeCalledTimes(1);
    expect(repoSpy).toBeCalledWith(1);
  });

  it('should add a new contributor', async () => {
    const repoSpy = jest.spyOn(repo, 'save');
    const contributorDTO = new ContributorDTO(
      'New Contributor',
      'new.contributor@example.com'
    );
    const newContributor = await service.createContributor(contributorDTO);
    expect(newContributor).toBeTruthy();
    expect(newContributor.nickName).toEqual(contributorDTO.nickName);
    expect(newContributor.email).toEqual(contributorDTO.email);
    expect(typeof newContributor.id).toEqual('number');
    expect(newContributor.createdAt).toBeInstanceOf(Date);
    expect(newContributor.updatedAt).toBeNull();
    expect(newContributor).toEqual(data[data.length - 1]);
    expect(repoSpy).toBeCalledTimes(1);
    expect(repoSpy).toBeCalledWith(contributorDTO);
  });

  describe('Update contributor', () => {
    it(`should return null when the contributor to update doesn't exist`, async () => {
      const findOneSpy = jest.spyOn(repo, 'findOne');
      const saveSpy = jest.spyOn(repo, 'save');
      const id = contributors.length + 1; // will be missing
      const contributorDTO = new ContributorDTO('Contributor');
      await expect(
        service.updateContributorById(id, contributorDTO)
      ).resolves.toBeNull();
      expect(findOneSpy).toBeCalledTimes(1);
      expect(findOneSpy).toBeCalledWith(id);
      expect(saveSpy).toBeCalledTimes(0);
    });

    it(`should return update the contributor by given id`, async () => {
      const findOneSpy = jest.spyOn(repo, 'findOne');
      const saveSpy = jest.spyOn(repo, 'save');
      const id = 1;
      const contributorDTO = new ContributorDTO(
        'Updated Contributor',
        'updated@example.com'
      );
      await expect(
        service.updateContributorById(id, contributorDTO)
      ).resolves.toEqual(data[0]);
      expect(data[0].nickName).toEqual(contributorDTO.nickName);
      expect(data[0].email).toEqual(contributorDTO.email);
      expect(data[0].updatedAt).toBeInstanceOf(Date);
      expect(findOneSpy).toBeCalledTimes(1);
      expect(findOneSpy).toBeCalledWith(id);
      expect(saveSpy).toBeCalledTimes(1);
      expect(saveSpy).toBeCalledWith(data[0]);
    });
  });

  describe('Delete contributor', () => {
    it(`should return false when the contributor doesn't exist`, async () => {
      const id = contributors.length + 1; // will be missing
      const repoSpy = jest.spyOn(repo, 'delete');
      await expect(service.removeContributorById(id)).resolves.toEqual(false);
      expect(repoSpy).toBeCalledTimes(1);
      expect(repoSpy).toBeCalledWith(id);
    });

    it('should delete the contributor', async () => {
      const id = 1;
      const repoSpy = jest.spyOn(repo, 'delete');
      await expect(service.removeContributorById(id)).resolves.toEqual(true);
      const [, ...rest] = contributors;
      expect(data).toEqual(rest);
      expect(repoSpy).toBeCalledTimes(1);
      expect(repoSpy).toBeCalledWith(id);
    });
  });
});
