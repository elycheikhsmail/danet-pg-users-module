import { Inject, Injectable } from 'danet/mod.ts';
import { Article } from './class.ts';
import type { Repository } from '../database/repository.ts';
import { USER_REPOSITORY } from './constant.ts';

@Injectable()
export class ArticleService {
  constructor(
    @Inject(USER_REPOSITORY) private repository: Repository<Article>,
  ) {
  }

  getAll() {
    return this.repository.getAll();
  }

  getById(id: string) {
    return this.repository.getById(id);
  }

  async create(Article: Omit<Article, '_id'>) {
    return this.repository.create(Article);
  }

  update(ArticleId: string, Article: Article) {
    return this.repository.updateOne(ArticleId, Article);
  }

  async deleteOneById(ArticleId: string) {
    await this.repository.deleteOne(ArticleId);
  }

  deleteAll() {
    return this.repository.deleteAll();
  }
}
