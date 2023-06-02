import { UserController } from './controller.ts';
// deno-lint-ignore no-unused-vars
import { Module, TokenInjector } from 'danet/mod.ts';

@Module({
  controllers: [UserController],
  // change InMemoryTodoRepository by any custom repository using other database engine if needed
})
export class UserModule {}
