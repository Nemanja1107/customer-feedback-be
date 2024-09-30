import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomLoggerService } from 'src/logger/logger-service/logger-service.service';
import { Category } from 'src/models/category/category.schema';
import { CategoryInterface } from 'src/models/interfaces/category/category.interface';

@Injectable()
export class CategoryService {

    constructor(@InjectModel(Category.name) private categoryModel: Model<Category>, private logger: CustomLoggerService) { }

    async findAll(): Promise<CategoryInterface[]> {
        const categories = await this.categoryModel.find();
        if (categories.length === 0) {
            this.logger.warn("No categories found");
            throw new NotFoundException("No categories found");
        }
        return categories;
    }

    async addCategory(createCategory: Category): Promise<CategoryInterface> {
        const newCategory = new this.categoryModel(createCategory);
        const savedCategory = await newCategory.save();
        this.logger.log('info', 'Category created successfully: ' + savedCategory._id);
        return savedCategory;
    }

    async updateCategory(id: string, category: Category): Promise<CategoryInterface> {
        const categoryToUpdate = await this.categoryModel.findByIdAndUpdate(
            id,
            {
                categoryName: category.categoryName,
                description: category.description,
                categoryIcon: category.categoryIcon
            },
            { new: true }
        );

        if (!categoryToUpdate) {
            this.logger.warn("Category not found for update with ID: " + id);
            throw new NotFoundException("Category not found");
        }

        this.logger.log('info', 'Category updated successfully: ' + categoryToUpdate._id);
        return categoryToUpdate;
    }

    async deleteCategory(id: string) {
        const deletedCategory = await this.categoryModel.findByIdAndDelete(id);

        if (deletedCategory) {
            this.logger.log("info", "Category deleted successfully: " + deletedCategory._id);
        } else {
            this.logger.warn("Category not found for deletion with ID: " + id);
            throw new NotFoundException("Category not found");
        }
    }

}
