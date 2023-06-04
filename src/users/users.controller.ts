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

  @Get('logout')
  async logoutUser(@Req() req: Request) {
    console.log(req);
    return this.userService.logoutUser(req);
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

  @Get('write')
  async protected_for_write(@Req() req: Request) {
    // assuming write data in  db
    const can_I_write_in_db = await this.userService.dontAllowAnonymusWriteInDb(
      req,
    );
    const resp = can_I_write_in_db
      ? { msg: 'ok, you can write in db' }
      : { msg: 'no, you can\'t write in db' };
    return resp;
  }
}
