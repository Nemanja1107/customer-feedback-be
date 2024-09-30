import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsObject, IsString } from "class-validator";
import { Types } from "mongoose";

export class ReviewDto {

    @ApiProperty({ example: 'UserId: {some random long string}' })
    @IsObject()
    userId: Types.ObjectId

    @ApiProperty({ example: 'Store: {some random long string}' })
    @IsObject()
    storeId: Types.ObjectId

    @ApiProperty({ example: 'TestComment' })
    @IsString()
    comment: string

    @ApiProperty({ example: 5 })
    @IsNumber()
    rating: number

    @ApiProperty({ example: '2024-09-19T20:52:41.806Z' })
    @IsDate()
    createdAt: Date

    @ApiProperty({ example: '2024-09-19T20:52:41.806Z' })
    @IsDate()
    updatedAt: Date
}
