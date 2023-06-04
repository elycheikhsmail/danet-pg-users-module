import { RepositoryUserModel } from '../database/repository.ts';
import { User } from './users.class.ts';
import { Inject } from 'danet/mod.ts';
import { DATABASE } from '../database/module.ts';
import { PostgresService } from '../database/postgres.service.ts';

export class UserRepository implements RepositoryUserModel<User> {
  constructor(@Inject(DATABASE) private dbService: PostgresService) {
  }
  async create(user: Omit<User, '_id'>) {
    const { rows } = await this.dbService.client.queryObject<User>(
      `INSERT INTO users (email, password) VALUES ('${user.email}', '${user.password}') RETURNING _id, email, password;`,
    );
    return rows[0];
  }

  async checkUser(user: Omit<User, '_id'>) {
    const { rows } = await this.dbService.client.queryObject<User>(
      `SELECT  email, password FROM users  WHERE email='${user.email}' AND password='${user.password}';`,
    );
    return rows[0];
  }

  async logout(token: string): Promise<void> {
    await this.dbService.client.queryObject(
      `INSERT INTO tokens (token_string) VALUES ('${token}');`,
    );
  }

  async check_if_logout(token: string): Promise<boolean> {
    const results = await this.dbService.client.queryObject(
      `SELECT (token_string) from tokens WHERE token_string='${token}' LIMIT 1;`,
    );
    const isLogout = results.rowCount ? results.rowCount : 0;
    return isLogout == 1;
  }
}
