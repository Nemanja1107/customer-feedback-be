import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from 'src/services/user/user.service';
import { instance as logger } from 'src/logger/winston.logger'
import { UserInterface } from 'src/models/interfaces/user/user.interface';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from 'src/models/dto/userDto/user.dto/user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {

    constructor(private userService: UserService) { }

    @Get('/all')
    @ApiOperation({ summary: 'Fetch all users from database' })
    @ApiResponse({
        status: 200,
        description: 'Users found',
        type: UserDto,
        isArray: true
    })
    @ApiResponse({ status: 404, description: 'No users found' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    async findAll(): Promise<UserInterface[]> {
        logger.info('Fetching all users');
        return this.userService.findAllUsers();
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Fetch user by id' })
    @ApiResponse({
        status: 200,
        description: 'User found',
        type: UserDto
    })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @ApiParam({ name: 'id', required: true, description: 'Id of the user' })
    async findUserById(@Param('id') id: any): Promise<UserInterface> {
        logger.info(`Fetching user with ID: ${id}`);
        return this.userService.findUserById(id);
    }

    @Post('')
    @ApiOperation({ summary: 'Create new user' })
    @ApiResponse({
        status: 201,
        description: 'User successfully created',
        type: UserDto
    })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 409, description: 'User already exists' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @ApiBody({ type: UserDto })
    async registerUser(@Body() createUser: UserInterface): Promise<UserInterface> {
        logger.info('Registering new user: ' + JSON.stringify(createUser));
        return this.userService.createUser(createUser);
    }

    /*
    @ApiOperation({ summary: 'Log in with existing user' })
    @Post('/login')
    async loginUser(@Body() user: { username: string, password: string }): Promise<UserInterface> {
        logger.info('User login attempt for username: ' + user.username);
        return this.userService.login(user.username, user.password);
    } 
    */

    @Put('/update/:id')
    @ApiOperation({ summary: 'Update existing user' })
    @ApiResponse({
        status: 200,
        description: 'User successfully updated',
        type: UserDto
    })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @ApiParam({ name: 'id', required: true, description: 'ID of the user to update' })
    @ApiBody({ type: UserDto })
    async updateUser(@Param('id') id: any, @Body() user: UserInterface): Promise<UserInterface> {
        logger.info(`Updating user with ID: ${id}`);
        return this.userService.updateUser(id, user);
    }

    @Delete('/delete/:id')
    @ApiOperation({ summary: 'Delete existing user' })
    @ApiParam({ name: 'id', required: true, description: 'ID of the user to delete' })
    @ApiResponse({
        status: 200,
        description: 'User successfully deleted'
    })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 404, description: 'User not found' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    async deleteUser(@Param('id') id: any) {
        logger.info(`Deleting user with ID: ${id}`);
        return this.userService.deleteUser(id);
    }

}
