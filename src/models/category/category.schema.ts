import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CategoryDocument = HydratedDocument<Category>

@Schema()
export class Category {
    @Prop({ required: true })
    categoryName: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    categoryIcon: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category)