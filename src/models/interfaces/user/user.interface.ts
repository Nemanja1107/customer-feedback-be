import { Types } from "mongoose"

export interface User {
    _id: Types.ObjectId,
    firstName: string,
    lastName: string,
    email: string,
    username: string,
    password: string,
    age: number,
    role: string
}

export type { User as UserInterface }
