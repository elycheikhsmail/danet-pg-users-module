// deno-lint-ignore-file require-await
// deno-lint-ignore no-unused-vars
import { Body, Controller, Delete, Get, Param, Post, Put } from 'danet/mod.ts';
import { User } from './users.class.ts';
import { UserService } from './users.service.ts';

@Controller('users')
export class UserController {
  constructor(public userService: UserService) {
  }

  @Post('register')
  async registerUser(@Body() user: User) {
    return this.userService.create(user);
  }
}
