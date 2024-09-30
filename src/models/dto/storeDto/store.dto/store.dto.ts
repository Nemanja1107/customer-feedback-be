import { ApiProperty } from "@nestjs/swagger";
import { IsObject, IsString } from "class-validator";
import { Types } from "mongoose";

export class StoreDto {

    @ApiProperty({ example: 'TestStoreName' })
    @IsString()
    name: string

    @ApiProperty({ example: 'TestStoreLogo.png' })
    @IsString()
    logo: string

    @ApiProperty({ example: 'TestStoreDescription' })
    @IsString()
    description: string

    @ApiProperty({ example: 'TestCategoryId = {some random long string}' })
    @IsObject()
    categoryId: Types.ObjectId
}
