import { Body, Controller, Get, Post, UseGuard } from 'danet/mod.ts';
import { User } from './users.class.ts';
import { UserService } from './users.service.ts';
import { SimpleAuthGuard } from './users.guard.ts';

@Controller('users')
export class UserController {
  constructor(public userService: UserService) {
  }

  @Post('register')
  async registerUser(@Body() user: User) {
    return this.userService.create(user);
  }

  @Post('login')
  async loginUser(@Body() user: User) {
    return this.userService.checkUser(user);
  }

  @Get('protected-page')
  @UseGuard(SimpleAuthGuard)
  async protected_page() {
    return { msg: 'ok' };
  }
}
