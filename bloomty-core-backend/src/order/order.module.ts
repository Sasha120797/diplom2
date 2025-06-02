import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [PrismaModule, UserModule, ProductModule],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule { }
