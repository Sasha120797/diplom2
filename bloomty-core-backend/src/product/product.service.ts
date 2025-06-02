import { HttpStatus, Injectable } from '@nestjs/common';
import { AppException } from 'src/exception/app.exception';
import { PrismaService } from 'src/prisma/prisma.service';
import { createProductDTO } from './dto/createProduct.dto';
import { FileService, FileType } from 'src/file/file.service';
import { Prisma } from '@prisma/client';
import { updateProductDTO } from './dto/updateProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileService: FileService,
  ) { }

  async createProduct(
    createProductDTO: createProductDTO,
    { pictures }: { pictures: File[] },
  ) {
    if (pictures.length < 1) {
      throw new AppException('Невозможно добавить товар без фотографий');
    }
    const productPictures = await this.fileService.createFiles(
      FileType.IMAGE,
      pictures,
    );
    const newProduct = await this.prismaService.product.create({
      data: {
        ...createProductDTO,
        images: productPictures,
        /*@ts-ignore*/
        onSale: Boolean(createProductDTO.onSale === "true" ? true : false),
        /*@ts-ignore*/
        isFeatured: Boolean(createProductDTO.isFeatured === "true" ? true : false)
      },
    });
    return newProduct;
  }

  async updateProduct(
    updateProductDTO: updateProductDTO,
    { pictures }: { pictures: File[] },
  ) {
    const updateProductData: Partial<Prisma.ProductGetPayload<{}>> = {
      ...updateProductDTO,
    };
    if (pictures && pictures.length > 0) {
      updateProductData['images'] = await this.fileService.createFiles(
        FileType.IMAGE,
        pictures,
      );
    }
    const isProductExist = await this.getProductById(updateProductDTO.id);

    if (!isProductExist) {
      throw new AppException('Продукт не найден', HttpStatus.NOT_FOUND);
    }

    const updatedProduct = await this.prismaService.product.update({
      where: {
        id: updateProductDTO.id,
      },
      data: {
        ...updateProductData,
        /*@ts-ignore*/
        onSale: Boolean(updateProductDTO.onSale === "true" ? true : false),
        /*@ts-ignore*/
        isFeatured: Boolean(updateProductDTO.isFeatured === "true" ? true : false)
      },
    });
    return updatedProduct;
  }

  async getProductById(id: string) {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new AppException('Продукт не найден', HttpStatus.NOT_FOUND);
    }

    // Увеличиваем количество просмотров
    await this.prismaService.product.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    return product;
  }

  async getRandomProduct() {
    // Получаем общее количество товаров
    const totalProducts = await this.prismaService.product.count();

    if (totalProducts === 0) {
      throw new AppException('Товары не найдены', HttpStatus.NOT_FOUND);
    }

    // Генерируем случайный индекс
    const randomIndex = Math.floor(Math.random() * totalProducts);

    // Получаем случайный товар
    const randomProduct = await this.prismaService.product.findMany({
      skip: randomIndex,
      take: 1,
    });

    if (!randomProduct || randomProduct.length === 0) {
      throw new AppException('Товар не найден', HttpStatus.NOT_FOUND);
    }

    return randomProduct[0];
  }

  async getFilteredProducts(filters: {
    price?: string;
    type?: string;
    category?: string;
    color?: string;
    sort?: string;
  }) {
    const { price, type, category, color, sort } = filters;

    // Фильтр по цене (если передан)
    const priceFilter = this.getPriceFilter(price);

    // Фильтр по типу изделия (если передан)
    const typeFilter = type ? { category: type } : {};

    // Фильтр по категории (если передан)
    const categoryFilter = this.getCategoryFilter(category);

    // Фильтр по цвету (если передан)
    const colorFilter = color ? { color } : {};

    // Сортировка (если передана)
    const orderBy = this.getSortOrder(
      sort,
    ) as Prisma.ProductOrderByWithRelationInput;

    const whereFilter = {
      ...priceFilter,
      ...typeFilter,
      ...categoryFilter,
      ...colorFilter,
    } as Prisma.ProductWhereInput;

    // Формируем запрос к базе данных
    return this.prismaService.product.findMany({
      where: whereFilter,
      orderBy,
    });
  }

  private getPriceFilter(price?: string) {
    if (!price) return {};

    const priceRange = {
      do10000r: { lt: 3500 },
      do40000r: { lt: 7000 },
      more40000r: { gt: 7000 },
    }[price];

    if (!priceRange) return {};

    return {
      OR: [
        { onSale: true, salePrice: priceRange },
        { onSale: false, basePrice: priceRange },
      ],
    };
  }

  private getCategoryFilter(category?: string) {
    if (!category) return {};

    return {
      OR: [
        category === 'hit' ? { isFeatured: true } : undefined,
        category === 'sale' ? { onSale: true } : undefined,
      ].filter(Boolean), // Убираем undefined из массива
    };
  }

  private getSortOrder(sort?: string) {
    if (!sort) return {};

    return {
      costUp: { basePrice: 'asc' },
      costDown: { basePrice: 'desc' },
      popularity: { views: 'desc' },
      all: {},
    }[sort];
  }

  async findProductsByIds(productIds: string[]) {
    const products = await this.prismaService.product.findMany({
      where: {
        id: { in: productIds },
      },
    });

    return products;
  }

  async findByName(name: string) {
    const findedProducts = await this.prismaService.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: name,
              mode: 'insensitive'
            }
          },
          {
            sku: {
              contains: name,
              mode: 'insensitive'
            }
          }
        ]
      }
    });

    return findedProducts;
  }

  async productError() {
    throw new Error('Тестовая ошибка ошибковичка');
  }

  async removeById(id: string) {
    const deletedProduct = await this.prismaService.product.delete({ where: { id: id } })
    return deletedProduct;
  }
}
