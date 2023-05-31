import { ArticleController } from './controller.ts';
import { ArticleService} from './service.ts';
import { Module, TokenInjector } from 'danet/mod.ts';
import { USER_REPOSITORY } from './constant.ts';
import { PostgresRepository } from "./postgres-repository.ts";
import { DatabaseModule } from "../database/module.ts";

@Module({
  controllers: [ArticleController],
  injectables: [new TokenInjector(PostgresRepository, USER_REPOSITORY), ArticleService], // change InMemoryTodoRepository by any custom repository using other database engine if needed
    imports: [DatabaseModule]
})
export class ArticleModule {}
