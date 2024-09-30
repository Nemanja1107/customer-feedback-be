import { Types } from "mongoose";

export interface Category {
    _id?: Types.ObjectId,
    categoryName: string,
    categoryIcon: string,
    description: string
}

export type { Category as CategoryInterface }