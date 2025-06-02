import { axiosInstance } from './core';

export class OrderRequests {

    static async createOrder(orderData: {
        address: string,
        productIds: string[],
        comment: string
    }) {
        return await axiosInstance.post('/order/create', orderData)
    }

    static async getOrder(orderId: string) {
        return await axiosInstance.get('/order/' + orderId);
    }
}