import { axiosInstance } from "./core";
import { RegisterFormData } from "../pages/registerPage/registerPage";
import { IUser } from "../types/User";

export class UserRequests {

    static async registerUser(formData: RegisterFormData) {
        return await axiosInstance.post('/user/register', formData);
    }

    static async loginUser(cred: { email: string, password: string }) {
        return await axiosInstance.post<{ token: string, user: IUser }>('/user/login', cred);
    }

    static async getMe() {
        return await axiosInstance.get('/user/me');
    }

    static async addToWhishlist(id: string) {
        return await axiosInstance.post('/user/addtowishlist/' + id,);
    }

    static async removeFromWhishlist(id: string) {
        return await axiosInstance.post('/user/removefromwishlist/' + id,);
    }

    static async addToCart(id: string) {
        return await axiosInstance.post('/user/addtocart/' + id,);
    }

    static async removeFromCart(id: string) {
        return await axiosInstance.post('/user/removefromcart/' + id,);
    }

}