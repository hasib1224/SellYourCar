import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UserService {
    private repo;
    constructor(repo: Repository<User>);
    createUser(email: string, password: string): Promise<User>;
    findOne(id: number): Promise<User>;
    find(email: string): Promise<User[]>;
    update(id: number, attrs: Partial<User>): Promise<User>;
    remove(id: number): Promise<User>;
}
