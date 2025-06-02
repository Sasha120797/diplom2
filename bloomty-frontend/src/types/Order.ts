import { IProduct } from "./Product";

export interface IOrder {
    id: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    status: string;
    address: string;
    comment: string | null;
    review: string | null;
}

export interface IOrderExtended {
    id: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    status: string;
    address: string;
    comment: string | null;
    review: string | null;
    products: IProduct[]
}