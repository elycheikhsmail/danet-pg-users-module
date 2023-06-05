import { MyController } from './my.controller.ts';
import { Module, TokenInjector } from 'danet/mod.ts';
import { MyRepository } from './my.reposetory.ts';
import { USER_REPOSITORY } from './constant.ts';
import { MyService } from './my.service.ts';
import { DatabaseModule } from '../database/module.ts';

@Module({
  controllers: [MyController],
  injectables: [
    new TokenInjector(MyRepository, USER_REPOSITORY),
    MyService,
  ], // change InMemoryTodoRepository by any custom repository using other database engine if needed
  imports: [DatabaseModule],
})
export class MyModule {}
