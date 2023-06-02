// deno-lint-ignore-file require-await
// deno-lint-ignore no-unused-vars
import { Body, Controller, Delete, Get, Param, Post, Put } from 'danet/mod.ts';
import { User } from './users.class.ts';

@Controller('users')
export class UserController {
  @Post('register')
  async registerUser(@Body() user: User) {
    return user;
  }
}
