import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/models/dto/loginDto/login.dto/login.dto';
import { CustomLoggerService } from 'src/logger/logger-service/logger-service.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService, private logger: CustomLoggerService) { }

    @Post('login')
    @ApiOperation({ summary: 'User login' })
    @ApiBody({
        description: 'User login credentials',
        type: LoginDto,
    })
    @ApiResponse({
        status: 200,
        description: 'Successful login, returns access token and user information',
    })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    async login(@Body() body: { username: string; password: string }) {
        const user = await this.authService.validateUser(body.username, body.password);
        if (!user) {
            this.logger.error("Invalid credentials")
            throw new Error('Invalid credentials');
        }
        const accessToken = await this.authService.login(user);
        return {
            accessToken,
            user: {
                firstName: user.firstName,
                lastName: user.username,
                username: user.username,
                email: user.email
            },
        };
    }

}
