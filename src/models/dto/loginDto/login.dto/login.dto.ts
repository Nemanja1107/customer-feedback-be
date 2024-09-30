import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class LoginDto {

    @ApiProperty({ example: 'testUsername' })
    @IsString()
    username: string

    @ApiProperty({ example: 'hashed_password' })
    @IsString()
    password: string
}
