export interface IProduct {
    id: string;
    name: string;
    sku: string;
    basePrice: number;
    category: string;
    description: string;
    color: string;
    images: string[];
    views: number;
    onSale: boolean;
    isFeatured: boolean;
    salePrice?: number;
}