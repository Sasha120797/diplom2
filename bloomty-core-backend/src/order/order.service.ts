import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { ProductService } from 'src/product/product.service';
import { AppException } from 'src/exception/app.exception';
import { Prisma } from '@prisma/client';
import { EditOrderDto } from './dto/editOrder.dto';

@Injectable()
export class OrderService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly userService: UserService,
        private readonly productService: ProductService
    ) { }

    async createOrder(userId: string, createOrderDto: CreateOrderDto) {
        const { productIds, ...orderData } = createOrderDto;

        // Проверка существования всех товаров (защита от подлога)
        const products = await this.productService.findProductsByIds(productIds);

        if (products.length !== productIds.length) {
            throw new AppException('Произошла ошибка! Мы уже работаем над устранением');
        }

        // Создание заказа
        const order = await this.prismaService.order.create({
            data: {
                ...orderData,
                user: {
                    connect: { id: userId },
                },
                products: {
                    connect: productIds.map((id) => ({ id })),
                },
            },
            include: {
                products: true,
                user: true
            },
        });

        return this.formatOrder(order as Prisma.OrderGetPayload<{ include: { user: true, products: true } }>);;
    }

    async getOrderById(userID: string, orderID: string) {
        const order = await this.prismaService.order.findUnique({
            where: { id: orderID },
            include: {
                products: true,
                user: true
            },
        })

        if (!order || order.userId !== userID) {
            throw new AppException("Невозможно получить этот заказ")
        }

        return this.formatOrder(order as Prisma.OrderGetPayload<{ include: { user: true, products: true } }>);
    }

    async editOrderById(editOrderDto: EditOrderDto) {
        const updateOrderData: Partial<Prisma.OrderGetPayload<{}>> = {
            ...editOrderDto,
        };
        const updatedOrder = await this.prismaService.order.update({
            where: {
                id: editOrderDto.id,
            },
            data: {
                ...updateOrderData,
            },
        });
        return this.formatOrder(updatedOrder as Prisma.OrderGetPayload<{ include: { user: true, products: true } }>);
    }

    async getAllOrdersFromAdmin() {
        return await this.prismaService.order.findMany({
            include: {
                products: true,
                user: true
            },
        })
    }

    formatOrder(order: Prisma.OrderGetPayload<{ include: { user: true, products: true } }>) {
        const partialOrder = { ...order, user: this.userService.formatUser(order.user) }
        return partialOrder;
    }
}
