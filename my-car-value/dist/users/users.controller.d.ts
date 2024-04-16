import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    createUser(body: CreateUserDto): void;
    findOne(id: string): Promise<import("./user.entity").User>;
    findAllUsers(email: string): Promise<import("./user.entity").User[]>;
    removeUser(id: number): Promise<import("./user.entity").User>;
    updateUser(id: string, body: UpdateUserDto): Promise<import("./user.entity").User>;
}
