import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateOrderDto {
    @IsNotEmpty()
    @IsNotEmpty()
    @IsArray()
    productIds: string[]; //Массив ID продуктов

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsString()
    @IsOptional()
    comment?: string;

    @IsString()
    @IsOptional()
    review?: string;
}