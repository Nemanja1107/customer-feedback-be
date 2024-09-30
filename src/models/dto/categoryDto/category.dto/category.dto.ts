import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CategoryDto {

    @ApiProperty({ example: 'TestCategoryName' })
    @IsString()
    categoryName: string;

    @ApiProperty({ example: 'TestCategoryDescription' })
    @IsString()
    description: string;

    @ApiProperty({ example: 'TestCategoryIcon' })
    @IsString()
    categoryIcon: string;
}
