import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';
import { FileModule } from './file/file.module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './exception/global.exception.filter';
import { ConfigModule } from '@nestjs/config';
import { OrderModule } from './order/order.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  providers: [
    {
      provide: APP_FILTER, // Регистрируем фильтр исключений как глобальный, для доступа к DI
      useClass: GlobalExceptionFilter,
    },
  ],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
      serveRoot: '/static', // или '/static' если хотите префикс
    }),
    PrismaModule,
    FileModule,
    UserModule,
    ProductModule,
    OrderModule,
  ],
})
export class AppModule { }
