import { Module } from 'danet/mod.ts';
import { TodoModule } from './todo/module.ts';
import { AppController } from './app.controller.ts';
import { ArticleModule } from './articles/module.ts';

@Module({
  controllers: [AppController],
  imports: [TodoModule, ArticleModule],
})
export class AppModule {}
