import jwt from 'npm:jsonwebtoken';
import { Request } from 'https://deno.land/x/oak@v11.1.0/request.ts';

//
import { Inject, Injectable } from 'danet/mod.ts';
import type { RepositoryTemporary } from '../database/repository.ts';
import { USER_REPOSITORY } from './constant.ts';
import { User } from './users.class.ts';
import { get_token_from_request, verify_token } from './utiles.ts';

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

  logoutUser(request: Request) {
    const token = get_token_from_request(request);
    if (token) {
      try {
        verify_token(token);
        // save this token in db
        return true;
      } catch (_error) {
        return false;
      }
    } else {
      return false;
    }
  }
}
