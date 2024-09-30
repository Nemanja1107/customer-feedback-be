import { Types } from "mongoose";

export interface Store {
    _id: Types.ObjectId,
    name: string,
    logo: string,
    description: string,
    categoryId: Types.ObjectId
}

export type { Store as StoreInterface }
