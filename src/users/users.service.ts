import { Inject, Injectable } from 'danet/mod.ts';
import type { RepositoryTemporary } from '../database/repository.ts';
import { USER_REPOSITORY } from './constant.ts';
import { User } from './users.class.ts';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private repository: RepositoryTemporary<User>,
  ) {
  }

  async create(user: Omit<User, '_id'>) {
    return this.repository.create(user);
  }
}
