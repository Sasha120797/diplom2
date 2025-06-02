import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/user/guard/auth.guard';
import { UserService } from 'src/user/user.service';
import { UserID } from 'src/user/decorator/user.decorator';
import { CreateOrderDto } from './dto/createOrder.dto';
import { EditOrderDto } from './dto/editOrder.dto';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
  ) { }

  /*
    Создание заказа,
    Payload из DTO, UserID при авторизации прилетает
  */
  @UseGuards(AuthGuard)
  @Post('/create')
  async createOrder(@UserID() userID: string, @Body() createOrderDTO: CreateOrderDto) {
    return await this.orderService.createOrder(userID, createOrderDTO);
  }

  @Get('/getadmin')
  async getAllOrdersFromAdmin() {
    return await this.orderService.getAllOrdersFromAdmin();
  }

  /*
    Изменение заказа по ID 
    в Param передается id заказа
  */
  @UseGuards(AuthGuard)
  @Post('/update')
  async editOrderById(@Body() editOrderDto: EditOrderDto) {
    return await this.orderService.editOrderById(editOrderDto);
  }

  /*
  Изменение заказа по ID  для админки
  в Param передается id заказа
*/
  @Post('/updateadmin')
  async editOrderByIdFromAdmin(@Body() editOrderDto: EditOrderDto) {
    return await this.orderService.editOrderById(editOrderDto);
  }

  /*
  Получения заказа по ID 
  в Param передается id заказа
  */
  @UseGuards(AuthGuard)
  @Get('/:orderid')
  async getOrderById(@UserID() userID: string, @Param('orderid') orderID: string) {
    return await this.orderService.getOrderById(userID, orderID);
  }

}