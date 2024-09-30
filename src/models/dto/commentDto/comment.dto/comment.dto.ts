import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CommentDto {

    @ApiProperty({ example: 'TestComment' })
    @IsString()
    comment: string
}
