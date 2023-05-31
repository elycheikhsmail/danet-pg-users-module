import { Repository } from '../database/repository.ts';
import { Article } from './class.ts';
import { Inject } from 'danet/mod.ts';
import { DATABASE } from '../database/module.ts';
import { PostgresService } from '../database/postgres.service.ts';

export class PostgresRepository implements Repository<Article> {
  constructor(@Inject(DATABASE) private dbService: PostgresService) {
  }
  async getAll(): Promise<Article[]> {
    const { rows } = await this.dbService.client.queryObject<
      Article
    >`SELECT * FROM articles`;
    return rows;
  }

  async getById(id: string) {
    const { rows } = await this.dbService.client.queryObject<Article>(
      `SELECT _id, title, content FROM articles WHERE _id = '${id}'`,
    );
    return rows[0];
  }

  async create(article: Omit<Article, '_id'>) {
    const { rows } = await this.dbService.client.queryObject<Article>(
      `INSERT INTO Article (title, content,price) VALUES ('${article.title}', '${article.content}','${article.price}') RETURNING _id, title, content;`,
    );
    return rows[0];
  }

  async updateOne(articleId: string, article: Article) {
    const { rows } = await this.dbService.client.queryObject<Article>(
      `UPDATE Article SET title = '${article.title}', content = '${article.content}' WHERE _id = '${articleId}' RETURNING _id, title, content;`,
    );
    return rows[0];
  }

  async deleteOne(articleId: string) {
    return this.dbService.client.queryObject<Article>(
      `DELETE FROM Article WHERE _id = '${articleId}';`,
    );
  }

  async deleteAll() {
    return this.dbService.client.queryObject<Article>(`DELETE FROM Article`);
  }
}
