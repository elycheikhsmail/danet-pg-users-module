import jwt from 'npm:jsonwebtoken';
const payload = {
  utilisateurId: 123456,
  nomUtilisateur: 'JohnDoe',
  role: 'admin',
};

const cleSecrete = 'votreCleSecrete'; // Remplacez par votre propre clé secrète

const token = jwt.sign(payload, cleSecrete);

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
      return { token };
    } else {
      return null;
    }
  }
}
