import { Body, Controller, Get, Post, Req, UseGuard } from 'danet/mod.ts';
import { User } from './users.class.ts';
import { UserService } from './users.service.ts';
import { ReadAuthGuard } from './users.read.guard.ts';
import { Request } from 'oak/mod.ts';

@Controller('users')
export class UserController {
  constructor(public userService: UserService) {
  }

  @Post('register')
  async registerUser(@Body() user: User) {
    return this.userService.create(user);
  }

  @Post('logout')
  async logoutUser(@Req() req: Request) {
    return await this.userService.logoutUser(req);
  }

  @Post('login')
  async loginUser(@Body() user: User) {
    return this.userService.checkUser(user);
  }
  @Get('read')
  @UseGuard(ReadAuthGuard)
  async protected_for_read() {
    // assuming data come from db
    return { msg: 'ok' };
  }

  @Get('read')
  @UseGuard(ReadAuthGuard)
  async protected_for_write() {
    // assuming write data in  db
    return { msg: 'ok' };
  }
}
