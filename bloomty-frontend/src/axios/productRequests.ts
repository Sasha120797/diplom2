import { FiltersState } from "../store/filters/filters";
import { IProduct } from "../types/Product";
import { axiosInstance } from "./core";

export class ProductRequests {

    static async getProducts(filters: FiltersState) {
        return await axiosInstance.get<IProduct[]>('/product', { params: { ...filters } })
    }

    static async getProduct(id: string) {
        return await axiosInstance.get<IProduct>('/product/getproduct/' + id);
    }

    static async getRandomProduct() {
        return await axiosInstance.get<IProduct>('/product/getrandomproduct');
    }

    static async findProducts(searchString: string) {
        return await axiosInstance.get<IProduct[]>('/product/find/' + searchString);
    }
}