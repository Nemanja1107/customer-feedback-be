import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models/user/user.schema';
import { UserService } from 'src/services/user/user.service';
import * as bcrypt from 'bcrypt'
import { CustomLoggerService } from 'src/logger/logger-service/logger-service.service';

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService, private userService: UserService, private logger: CustomLoggerService) { }

    async validateUser(username: string, password: string): Promise<User> {
        const user = await this.userService.findByUsername(username);
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        this.logger.error("User not found with username: " + username);
        throw new NotFoundException("User not found");
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.userId };
        const accessToken = this.jwtService.sign(payload);
        return { accessToken };
    }
}
