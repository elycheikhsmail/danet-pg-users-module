import { Module } from 'danet/mod.ts';
import { AppController } from './app.controller.ts';
import { UserModule } from './users/users.module.ts';
import { DatabaseModule } from './database/module.ts';
//import { MyModule } from './my/my.module.ts'; 

@Module({
  controllers: [AppController],
  imports: [UserModule,
    // MyModule,
    //DatabaseModule
    ],
})
export class AppModule {}
