import jwt from 'npm:jsonwebtoken';

//
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

  async checkUser(user: Omit<User, '_id'>) {
    const userOutput = await this.repository.checkUser(user);
    if (userOutput) {
      //

      const payload = {
        userId: userOutput._id,
        userEmail: user.email,
        role: 'admin',
      };

      const SECKRET_KEY = Deno.env.get('SECKRET_KEY');

      const token = jwt.sign(payload, SECKRET_KEY);
      return { token };
    } else {
      return null;
    }
  }
}
