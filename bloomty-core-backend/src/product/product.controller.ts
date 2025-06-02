import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { createProductDTO } from './dto/createProduct.dto';
import { updateProductDTO } from './dto/updateProduct.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  /*
  Метод для получения одного конкретного товара
  Параметр запроса :id - уникальный идентификатор товара
  */
  @Get('/getproduct/:id')
  async getProduct(@Param('id') id: string) {
    return await this.productService.getProductById(id);
  }

  /*
    Метод для получения одного рандомного продукта
  */
  @Get('/getrandomproduct')
  async getRandomProduct() {
    return await this.productService.getRandomProduct();
  }

  /*
    Метод для получения фильтрованных товаров по query параметрам
    Query параметры
    price?: string -> принимает 3 параметра, менеьше 10000r, меньше 40000r, больше 400000r (см. функцию private getPriceFilter)
    type?: string -> Фильтр по типу изделия 
    category?: string -> Фильтр по категории (товар хит или товар на скидке )
    color?: string -> Фильтр по цвету 
    sort?: string -> Тип сортировки (все, по возрстанию цены, по убывнию цены, по популярности см.функцию private getSortOrder)
  */
  @Get('/')
  async getFilteredProducts(
    @Query('price') price?: string,
    @Query('type') type?: string,
    @Query('category') category?: string,
    @Query('color') color?: string,
    @Query('sort') sort?: string,
  ) {
    return await this.productService.getFilteredProducts({
      price,
      type,
      category,
      color,
      sort,
    });
  }

  /*
    Метод для создания товара
    BODY из DTO + поле pictures с картинками для товара
  */
  @UseInterceptors(FileFieldsInterceptor([{ name: 'pictures', maxCount: 5 }]))
  @Post('/create')
  async createProduct(
    @Body() createProductDTO: createProductDTO,
    @UploadedFiles() files,
  ) {
    return await this.productService.createProduct(createProductDTO, files);
  }

  /*
    Метод для обновления товара
    BODY из DTO + поле pictures с картинками для товара(необязательно)
  */
  @UseInterceptors(FileFieldsInterceptor([{ name: 'pictures', maxCount: 5 }]))
  @Post('/update')
  async updateProduct(
    @Body() updateProductDTO: updateProductDTO,
    @UploadedFiles() files,
  ) {
    return await this.productService.updateProduct(updateProductDTO, files);
  }

  /*
    Метод для поиска товара по названию
    Название приходит из @Param()
  */
  @Get('/find/:name')
  async findByName(@Param('name') name: string) {
    return await this.productService.findByName(name);
  }

  /*
  Метод для удаления товара по id
  id приходит из @Param()
  */
  @Get('/delete/:id')
  async removeById(@Param('id') id: string) {
    return await this.productService.removeById(id);
  }

  /*
    Маршрут для тестовых ошибок
    В т.ч. теста исключений(global exception filter) и т.д
  */
  @Get('/error')
  async productError() {
    return await this.productService.productError();
  }
}
