import { BadRequestException, Injectable, LoggerService, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CustomLoggerService } from 'src/logger/logger-service/logger-service.service';
import { StoreInterface } from 'src/models/interfaces/store/store.interface';
import { Store } from 'src/models/store/store.schema';

@Injectable()
export class StoreService {

    constructor(@InjectModel(Store.name) private storeModel: Model<Store>, private logger: CustomLoggerService) { }

    async findAll(): Promise<StoreInterface[]> {
        const stores = await this.storeModel.find();
        if (stores.length === 0) {
            this.logger.warn("No stores found");
            throw new NotFoundException("No stores found");
        }
        return stores;
    }

    async addStore(store: Store): Promise<StoreInterface> {
        const createStore = await this.storeModel.create(store);
        this.logger.log('info', 'Store created successfully: ' + createStore._id);
        return createStore;
    }

    async findStoreByCategoryId(id: any): Promise<StoreInterface[]> {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid ID format');
        }
        const storeCategory = await this.storeModel.find({ categoryId: id });
        if (storeCategory.length === 0) {
            this.logger.warn("No stores found for category ID: " + id);
            throw new NotFoundException("Error, category with id " + id + " not found");
        }
        return storeCategory;
    }

    async deleteStore(id: any) {
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid ID format');
        }

        const deletedStore = await this.storeModel.findByIdAndDelete(id);

        if (deletedStore) {
            this.logger.log("info", "Store deleted successfully: " + deletedStore._id);
        } else {
            this.logger.warn("Store not found for deletion with ID: " + id);
            throw new NotFoundException("Store not found");
        }
    }

}
