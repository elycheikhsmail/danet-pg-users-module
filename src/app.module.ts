import { Module } from 'danet/mod.ts';
import { AppController } from './app.controller.ts';
import { UserModule } from './users/users.module.ts';

@Module({
  controllers: [AppController],
  imports: [UserModule],
})
export class AppModule {}
