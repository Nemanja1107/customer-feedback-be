import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/services/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/models/user/user.schema';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { CustomLoggerService } from 'src/logger/logger-service/logger-service.service';

@Module({
    imports: [
        PassportModule,
        JwtModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '15m' },
            }),
            inject: [ConfigService],
        }),
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
    ],
    providers: [AuthService, UserService, JwtStrategy, JwtAuthGuard, CustomLoggerService],
    controllers: [AuthController]
})
export class AuthModule { }
