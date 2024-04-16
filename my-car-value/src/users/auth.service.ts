import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import bcrypt from 'bcrypt';
import { promisify } from 'util';
import JWT, { Secret } from 'jsonwebtoken';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signup(email: string, password: string) {
    const users = await this.userService.find(email);
    console.log('Users', users);
    if (users.length) {
      throw new BadRequestException('Email in use');
    }

    // const salt = randomBytes(8).toString('hex');

    // const hash = (await scrypt(password, salt, 32)) as Buffer;
    // const result = salt + '.' + hash.toString('hex');

    // const user = await this.userService.createUser(email, result);
    try {
      const saltRounds = 3;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = await this.userService.createUser(email, hashedPassword);
      return user;
    } catch (error) {
      console.log(`Error in hashing:  ${error}`);
    }
  }

  async signin(email: string, password: string) {
    const [user] = await this.userService.find(email);

    if (!user) {
      throw new NotFoundException('user not found');
    }

    // const [salt, storedHash] = user.password.split('.');

    // const hash = (await scrypt(password, salt, 32)) as Buffer;
    // if (storedHash != hash.toString('hex')) {
    //   throw new UnauthorizedException('Password is incorrect');
    // }

    if (!bcrypt.compare(password, user.password)) {
      return {
        data: { success: false, message: 'give email and password correctly' },
      };
    }

    const jwt_token = await JWT.sign({ userId: user.userId }, 'secretKey', {
      expiresIn: '2d',
    });

    return {
      statusCode: 200,
      data: {
        success: true,
        message: 'Login Successful',
        user: {
          userId: user.userId,
          email: user.email,
        },
        AccessToken: jwt_token,
      },
    };
  }
}
