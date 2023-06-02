import { UserController } from './users.controller.ts';
import { Module, TokenInjector } from 'danet/mod.ts';
import { UserRepository } from './users.reposetory.ts';
import { USER_REPOSITORY } from './constant.ts';
import { UserService } from './users.service.ts';
import { DatabaseModule } from '../database/module.ts';

@Module({
  controllers: [UserController],
  injectables: [
    new TokenInjector(UserRepository, USER_REPOSITORY),
    UserService,
  ], // change InMemoryTodoRepository by any custom repository using other database engine if needed
  imports: [DatabaseModule],
})
export class UserModule {}
