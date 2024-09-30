import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { CategoryService } from 'src/services/category/category.service';
import { instance as logger } from 'src/logger/winston.logger'
import { CategoryInterface } from 'src/models/interfaces/category/category.interface';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryDto } from 'src/models/dto/categoryDto/category.dto/category.dto';

@ApiTags('category')
@Controller('category')
export class CategoryController {

    constructor(private categoryService: CategoryService) { }

    @Get('')
    @ApiOperation({ summary: 'Fetch all categories from database' })
    @ApiResponse({
        status: 200,
        description: 'Reviews found',
        type: CategoryDto,
        isArray: true
    })
    @ApiResponse({ status: 404, description: 'No category found' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    async findAll(): Promise<CategoryInterface[]> {
        logger.info('Fetching all categories');
        const categories = await this.categoryService.findAll();
        if (categories.length === 0) {
            logger.warn(`No categories found`);
            throw new NotFoundException(`No categories found`);
        }
        return categories;
    }

    @Post('')
    @ApiOperation({ summary: 'Save a new category' })
    @ApiResponse({
        status: 201,
        description: 'Review successfully created',
        type: CategoryDto,
    })
    @ApiResponse({ status: 400, description: 'Invalid category data' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @ApiBody({ type: CategoryDto })
    async saveCategory(@Body() category: CategoryInterface): Promise<CategoryInterface> {
        logger.info('Saving new category: ' + JSON.stringify(category));
        return this.categoryService.addCategory(category);
    }
}
