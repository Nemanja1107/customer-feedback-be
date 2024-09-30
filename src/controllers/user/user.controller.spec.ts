import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from 'src/services/user/user.service';
import { UserInterface } from 'src/models/interfaces/user/user.interface';
import { Types } from 'mongoose';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  const mockUserService = {
    findAllUsers: jest.fn(),
    findUserById: jest.fn()
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService
        }
      ]
    }).compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of users', async () => {
    const result = [
      {
        _id: "66ebed52d31ebfefb62f7aad",
        firstName: "TestFirstName",
        lastName: "TestLastName",
        age: 25,
        email: "test@test.com",
        username: "testUsername",
        password: "$2b$10$ntZDp79phOd8XgFPlxsq3ezgNUMA.UOSRBRr2dmsfBuvKobTqqIUy",
        role: "user",
        __v: 0,
      },
      {
        _id: "66f3e71dba0b080effb230c6",
        firstName: "TestFirstName2",
        lastName: "TestLastName2",
        age: 30,
        email: "test2@test.com",
        username: "testUsername2",
        password: "$2b$10$zOjWX/O3PFP27LzdhEzYNeDaBKxnFiLvzuKp8XdoqmP69FQzwdyPe",
        role: "user",
        __v: 0,
      },
    ];
    mockUserService.findAllUsers.mockReturnValue(Promise.resolve(result));

    expect(await controller.findAll()).toEqual(result)
    expect(userService.findAllUsers).toHaveBeenCalled();
  });

});
