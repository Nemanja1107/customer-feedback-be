import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, isString } from "class-validator";

export class UserDto {

    @ApiProperty({ example: 'TestFirstName' })
    @IsString()
    firstName: string;

    @ApiProperty({ example: 'TestLastName' })
    @IsString()
    lastName: string;

    @ApiProperty({ example: 22 })
    @IsNumber()
    age: number

    @ApiProperty({ example: 'test@test.com' })
    @IsString()
    email: string

    @ApiProperty({ example: 'testUsername' })
    @IsString()
    username: string

    @ApiProperty({ example: 'hashed_password' })
    @IsString()
    password: string

    @ApiProperty({ example: 'user' })
    @IsString()
    role: string
}
