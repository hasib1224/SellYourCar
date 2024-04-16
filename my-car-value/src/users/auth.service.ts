import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signup(email: string, password: string) {
    const user = await this.userService.find(email);
    if (user) {
      throw new BadRequestException('Email in use');
    }

    const salt = randomBytes(8).toString('hex');

    const hash=(await scrypt(password, salt, 32)) as Buffer; 
    const result = salt+'.'+hash.toString('hex');
    }

  signin() {}
}
