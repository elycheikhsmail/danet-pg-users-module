import { Body, Controller, Delete, Get, Param, Post, Put } from 'danet/mod.ts';
import { Article} from './class.ts';
import { ArticleService } from './service.ts';
import { ReturnedType } from 'danet_swagger/decorators.ts';

@Controller('Article')
export class ArticleController {
  constructor(public ArticleService: ArticleService) {
  }

  @ReturnedType(Article, true)
  @Get()
  async getAllArticle() {
    return this.ArticleService.getAll();
  }

  @ReturnedType(Article)
  @Get(':id')
  async getArticleById(@Param('id') ArticleId: string) {
    return this.ArticleService.getById(ArticleId);
  }

  @Post()
  async createArticle(@Body() Article: Article) {
    return this.ArticleService.create(Article);
  }

  @Put(':id')
  async updateArticle(@Param('id') ArticleId: string, @Body() Article: Article) {
    return this.ArticleService.update(ArticleId, Article);
  }

  @Delete(':id')
  async deleteOne(@Param('id') ArticleId: string) {
    return this.ArticleService.deleteOneById(ArticleId);
  }
}