import { IProduct } from './Product';
import { IOrder } from './Order';

export interface IUser {
    id: string;
    fullname: string;
    email: string;
    phone: string;
    resetedPassword: boolean;
    register_date: string;
    wishlist: IProduct[];
    cart: IProduct[];
    orders: IOrder[];
}