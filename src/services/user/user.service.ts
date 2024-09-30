import { BadRequestException, Injectable, LoggerService, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from 'src/models/user/user.schema';
import * as bcrypt from 'bcrypt';
import { UserInterface } from 'src/models/interfaces/user/user.interface';
import { CustomLoggerService } from 'src/logger/logger-service/logger-service.service';

@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<User>, private logger: CustomLoggerService) { }

    async findAllUsers(): Promise<UserInterface[]> {
        const users = await this.userModel.find();
        if (users.length === 0) {
            this.logger.warn("No users found");
            throw new NotFoundException("No users found");
        }
        return users;
    }

    async findUserById(id: string): Promise<UserInterface> {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid ID format');
        }
        const user = await this.userModel.findById(id);
        if (!user) {
            this.logger.warn("User not found with ID: " + id);
            throw new NotFoundException("User not found");
        }
        return user;
    }

    async findByUsername(username: string): Promise<UserInterface> {
        const user = this.userModel.findOne({ username });
        if (!user) {
            this.logger.warn("User not found with username: " + username);
            throw new NotFoundException("User not found");
        }
        return user;
    }

    async createUser(createUser: User): Promise<UserInterface> {
        const hashedPassword = await bcrypt.hash(createUser.password, 10);
        if (createUser.age < 18) {
            this.logger.warn("Invalid age, person MUST be 18+: " + createUser.age);
            throw new BadRequestException("Person MUST be 18+");
        }

        const newUser = new this.userModel({
            firstName: createUser.firstName,
            lastName: createUser.lastName,
            age: createUser.age,
            email: createUser.email,
            username: createUser.username,
            password: hashedPassword,
            role: createUser.role
        });

        const savedUser = await newUser.save();
        this.logger.log('info', 'User created successfully: ' + savedUser.username);
        return savedUser;
    }

    async login(username: string, password: string): Promise<UserInterface> {
        const user = await this.userModel.findOne({ username });
        if (!user) {
            this.logger.warn("User not found with username: " + username);
            throw new NotFoundException("User not found");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            this.logger.warn("Invalid password attempt for username: " + username);
            throw new NotFoundException("Invalid password");
        }
        this.logger.log('info', 'User logged in successfully: ' + username);
        return user;
    }

    async updateUser(id: string, user: User): Promise<UserInterface> {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid ID format');
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);

        const updatedUser = await this.userModel.findByIdAndUpdate(
            id,
            {
                firstName: user.firstName,
                lastName: user.lastName,
                age: user.age,
                email: user.email,
                username: user.username,
                password: hashedPassword,
                role: user.role,
            },
            { new: true }
        );

        if (!updatedUser) {
            this.logger.warn("User not found for update with ID: " + id);
            throw new NotFoundException("User not found");
        }

        this.logger.log('info', 'User updated successfully: ' + updatedUser.username);
        return updatedUser;
    }

    async deleteUser(id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid ID format');
        }

        const deletedUser = await this.userModel.findByIdAndDelete(id);

        if (deletedUser) {
            this.logger.log("info", "User deleted successfully: " + deletedUser.username);
        } else {
            this.logger.warn("User not found for deletion with ID: " + id);
            throw new NotFoundException("User not found");
        }
    }

}
