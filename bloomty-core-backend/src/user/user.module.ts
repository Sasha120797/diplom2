import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '7d' },
    }),
    PrismaModule,
    ProductModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [JwtModule, UserService],
})
export class UserModule {
  constructor() { }
}
