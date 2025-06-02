import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDTO } from './dto/registerUser.dto';
import { LoginUserDTO } from './dto/loginUser.dto';
import { AuthGuard } from './guard/auth.guard';
import { UserID } from './decorator/user.decorator';
import { ReguestResetPasswordDTO } from './dto/requestResetPassword.dto';
import { FinishResetPasswordDTO } from './dto/finishResetPassword.dto';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  /*
    Регистрация пользователя
    Body из DTO
  */
  @Post('/register')
  async registerUser(@Body() RegisterUserDTO: RegisterUserDTO) {
    return await this.userService.registerUser(RegisterUserDTO);
  }

  /*
      Авторизация пользователя
      Body из DTO
  */
  @Post('/login')
  async loginUser(@Body() LoginUserDTO: LoginUserDTO) {
    return await this.userService.loginUser(LoginUserDTO);
  }

  /*
    Защищено авторазацией
    Получения клиента 
  */
  @UseGuards(AuthGuard)
  @Get('/me')
  async getMe(@UserID() userID: string) {
    return await this.userService.getMe(userID);
  }

  /*
   Запрос смены пароля
   Получает E-Mail меняет статус пользователя(resetedPassword) на true
   TODO (сервис также должен отправить e-mail для смены пароля ссылку на фронт)
 */
  @Post('/requestresetpassword')
  async requestResetPassword(
    @Body() RequestResetPasswordDTO: ReguestResetPasswordDTO,
  ) {
    return await this.userService.requestResetPassword(RequestResetPasswordDTO);
  }

  /*
   Завершение смены пароля
   Получает id и новый пароль пользователя через DTO.
 */
  @Post('/finishresetpassword')
  async finishResetPassword(
    @Body() FinishResetPasswordDTO: FinishResetPasswordDTO,
  ) {
    return await this.userService.finishResetPassword(FinishResetPasswordDTO);
  }

  // Общий метод для обработки запросов корзины и избранного
  private async handleProductListRequest(
    productID: string,
    userID: string,
    method:
      | 'addToWishlist'
      | 'removeFromWishlist'
      | 'addToCart'
      | 'removeFromCart',
  ) {
    return this.userService[method](userID, productID);
  }

  /*
    Маршрут для добавления товара в избранное
    Получает product id через Параметр и добавляет в избранное
  */
  @UseGuards(AuthGuard)
  @Post('/addtowishlist/:product')
  async addToWishlist(
    @Param('product') productID: string,
    @UserID() userID: string,
  ) {
    return this.handleProductListRequest(productID, userID, 'addToWishlist');
  }

  /*
    Маршрут для удаления товара из избранного
    Получает product id через Параметр и удаляет из избранного 
  */
  @UseGuards(AuthGuard)
  @Post('/removefromwishlist/:product')
  async removeFromWishlist(
    @Param('product') productID: string,
    @UserID() userID: string,
  ) {
    return this.handleProductListRequest(
      productID,
      userID,
      'removeFromWishlist',
    );
  }

  /*
    Маршрут для добавления товара в корзину
    Получает product id через Параметр и добавляет в корзину
  */
  @UseGuards(AuthGuard)
  @Post('/addtocart/:product')
  async addToCart(
    @Param('product') productID: string,
    @UserID() userID: string,
  ) {
    return this.handleProductListRequest(productID, userID, 'addToCart');
  }

  /*
    Маршрут для удаления товара из корзины
    Получает product id через Параметр и удаляет из корзины 
  */
  @UseGuards(AuthGuard)
  @Post('/removefromcart/:product')
  async removeFromCart(
    @Param('product') productID: string,
    @UserID() userID: string,
  ) {
    return this.handleProductListRequest(productID, userID, 'removeFromCart');
  }

  /*
    Тестовый запрос для получения пользователя 
    /getuser/0f52a42f-3920-494f-a429-f159b7bf7418 (:id)
   */
  @UseGuards(AuthGuard)
  @Get('/getuser/:id')
  async getUserById(@Param('id') userID: string) {
    return await this.userService.getUser({ id: userID });
  }
}
