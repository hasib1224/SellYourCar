import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  Response,
  Request,
  Session,
} from '@nestjs/common';

import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UserController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(
    @Body() body: CreateUserDto,
    @Session() session: any,
    @Response() res,
  ) {
    const user = await this.authService.signin(body.email, body.password);
    // session.userId=user.id;
    // return user;
    if (user.data.success) {
      res.cookie('AccessToken', user.data.AccessToken, {
        httpOnly: true,
        maxAge: 2 * 24 * 60 * 60 * 1000,
        sameSite: 'none',
        secure: true,
      });
    }
  }

  @Post('/signout')
  async logout(@Response() res, @Request() req) {
    res.clearCookie('AccessToken', { secure: true, sameSite: 'none' });
    console.log('after logout', req.headers.cookie);
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const user = this.userService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('Not found exception');
    }
    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    const user = this.userService.find(email);
    if (!user) {
      throw new NotFoundException('Not found Exception');
    }
    return user;
  }

  @Delete('/:id')
  removeUser(@Param('id') id: number) {
    return this.userService.remove(id);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }

  @Get('/colors/:color')
  setColor(@Param('color') color: string, @Session() session: any) {
    session.color = color;
    console.log('set', session.color);
  }

  @Get('/colors')
  getColorss(@Session() session: any) {
    console.log(session.color, 'color');
    return session.color;
  }

  @Get('/whoami')
  whoAmI(@Request() req) {
    console.log(req.headers.cookie, "who am i");
    // return this.userService.findOne(session.userId);
  }
}
