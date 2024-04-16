import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class UserController {
    constructor(private userService:UserService){}
    @Post('/signup')
    createUser(@Body() body:CreateUserDto ){
        this.userService.createUser(body.email,body.password);
    }

    @Get('/:id')
    async findOne(@Param('id')  id:string) {
        const user= this.userService.findOne(parseInt(id));
        if(!user){
            throw new NotFoundException("Not found exception");
        }
        return user;
    }

    @Get()
    findAllUsers(@Query('email') email:string ){
        const user = this.userService.find(email);
        if(!user) {
            throw new NotFoundException("Not found Exception")
        }    
        return user ;
    }
    @Delete('/:id')
    removeUser(@Param('id') id:number){
        return this.userService.remove(id);
    }

    @Patch('/:id')
    updateUser(@Param('id') id:string, @Body() body :UpdateUserDto ) {
        return this.userService.update(parseInt(id),body);
    }

}
