import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { Store } from 'src/models/store/store.schema';
import { StoreService } from 'src/services/store/store.service';
import { instance as logger } from 'src/logger/winston.logger'
import { StoreInterface } from 'src/models/interfaces/store/store.interface';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StoreDto } from 'src/models/dto/storeDto/store.dto/store.dto';

@ApiTags('store')
@Controller('store')
export class StoreController {

    constructor(private storeService: StoreService) { }

    @Get('')
    @ApiOperation({ summary: 'Fetch all stores from database' })
    @ApiResponse({
        status: 200,
        description: 'Stores found',
        type: StoreDto,
        isArray: true,
    })
    @ApiResponse({ status: 404, description: 'No stores found' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    async findAll(): Promise<StoreInterface[]> {
        logger.info('Fetching all stores');
        const stores = await this.storeService.findAll();
        if (stores.length === 0) {
            logger.warn('No stores found');
            throw new NotFoundException('No stores found');
        }
        return stores;
    }

    @Get('/:id')
    @ApiOperation({ summary: 'Fetch stores by category ID' })
    @ApiParam({ name: 'id', required: true, description: 'ID of the category' })
    @ApiResponse({
        status: 200,
        description: 'Stores found for the given category ID',
        type: StoreDto,
        isArray: true,
    })
    @ApiResponse({ status: 404, description: 'No stores found for the given category ID' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    async findStoreByCategoryId(@Param('id') id: any): Promise<StoreInterface[]> {
        logger.info(`Fetching stores for category ID: ${id}`);
        const stores = await this.storeService.findStoreByCategoryId(id);
        if (stores.length === 0) {
            logger.warn(`No store found for category ID: ${id}`);
            throw new NotFoundException(`No stores found for category ID: ${id}`);
        }
        return stores;
    }

    @Post('')
    @ApiOperation({ summary: 'Save a new store' })
    @ApiResponse({
        status: 201,
        description: 'Store successfully created',
        type: StoreDto,
    })
    @ApiResponse({ status: 400, description: 'Invalid store data' })
    @ApiResponse({ status: 500, description: 'Internal server error' })
    @ApiBody({ type: StoreDto })
    async saveStore(@Body() store: StoreInterface): Promise<StoreInterface> {
        logger.info('Saving new store: ' + JSON.stringify(store));
        return this.storeService.addStore(store);
    }

}
