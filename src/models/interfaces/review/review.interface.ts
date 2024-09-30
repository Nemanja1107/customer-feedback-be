import { Types } from "mongoose";

export interface Review {
    _id: Types.ObjectId,
    userId: Types.ObjectId,
    storeId: Types.ObjectId,
    comment: string,
    rating: number,
    createdAt: Date,
    updatedAt: Date
}

export type { Review as ReviewInterface }
