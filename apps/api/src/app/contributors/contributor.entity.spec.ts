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

import { Contributor } from './contributor.entity';

describe('Contributor Entity', () => {
  it('should make a Contributor with no fields', () => {
    const contributor = new Contributor();
    expect(contributor).toBeTruthy();
    expect(contributor.id).toBeUndefined();
    expect(contributor.nickName).toBeUndefined();
    expect(contributor.email).toBeUndefined();
    expect(contributor.createdAt).toBeUndefined();
    expect(contributor.updatedAt).toBeUndefined();
  });

  it('should make a Contributor with nickName only', () => {
    const nickName = 'Jane Doe';
    const contributor = new Contributor(nickName);
    expect(contributor).toBeTruthy();
    expect(contributor.id).toBeUndefined();
    expect(contributor.nickName).toEqual(nickName);
    expect(contributor.email).toBeUndefined();
    expect(contributor.createdAt).toBeUndefined();
    expect(contributor.updatedAt).toBeUndefined();
  });

  it('should make a Contributor with nickName and a null email', () => {
    const nickName = 'John Doe';
    const contributor = new Contributor(nickName, null);
    expect(contributor).toBeTruthy();
    expect(contributor.id).toBeUndefined();
    expect(contributor.nickName).toEqual(nickName);
    expect(contributor.email).toBeNull();
    expect(contributor.createdAt).toBeUndefined();
    expect(contributor.updatedAt).toBeUndefined();
  });

  it('should make a Contributor with nickName and an email', () => {
    const nickName = 'Spammer';
    const email = 'spammer@example.com';
    const contributor = new Contributor(nickName, email);
    expect(contributor).toBeTruthy();
    expect(contributor.id).toBeUndefined();
    expect(contributor.nickName).toEqual(nickName);
    expect(contributor.email).toEqual(email);
    expect(contributor.createdAt).toBeUndefined();
    expect(contributor.updatedAt).toBeUndefined();
  });
});
