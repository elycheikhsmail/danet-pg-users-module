import { Inject } from 'danet/mod.ts';
import { DATABASE } from '../database/module.ts';
import { PostgresService } from '../database/postgres.service.ts';

export class MyRepository {
  constructor(@Inject(DATABASE) private dbService: PostgresService) {
  }

  async check_if_logout(token: string): Promise<boolean> {
    const results = await this.dbService.client.queryObject(
      `SELECT (token_string) from tokens WHERE token_string='${token}' LIMIT 1;`,
    );
    const isLogout = results.rowCount ? results.rowCount : 0;
    return isLogout == 1;
  }
}
