import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { User } from "../user/user.schema";
import { Store } from "../store/store.schema";

export type ReviewDocument = HydratedDocument<Review>

@Schema()
export class Review {
    @Prop({ type: Types.ObjectId, ref: User.name, required: true })
    userId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: Store.name, required: true })
    storeId: Types.ObjectId;

    @Prop({ required: true })
    comment: string;

    @Prop({ required: true, min: 1, max: 5 })
    rating: number;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date
}

export const ReviewSchema = SchemaFactory.createForClass(Review)