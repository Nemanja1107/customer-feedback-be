import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Category } from "../category/category.schema";

export type StoreDocument = HydratedDocument<Store>

@Schema()
export class Store {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    logo: string;

    @Prop()
    description: string;

    @Prop({ type: Types.ObjectId, ref: Category.name, required: true })
    categoryId: Types.ObjectId
}

export const StoreSchema = SchemaFactory.createForClass(Store)