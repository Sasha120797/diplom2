import { HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterUserDTO } from './dto/registerUser.dto';
import { AppException } from 'src/exception/app.exception';
import { LoginUserDTO } from './dto/loginUser.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ReguestResetPasswordDTO } from './dto/requestResetPassword.dto';
import { FinishResetPasswordDTO } from './dto/finishResetPassword.dto';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly productService: ProductService,
  ) { }

  async registerUser(RegisterUserDTO: RegisterUserDTO) {
    const existingUser = await this.getUser({ email: RegisterUserDTO.email });

    if (existingUser) {
      throw new AppException(
        'Пользователь с таким email уже существует',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Хешируем пароль
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(RegisterUserDTO.password, salt);

    const newUser = await this.prismaService.user.create({
      data: {
        ...RegisterUserDTO,
        password: hashedPassword,
      },
    });

    return this.formatUser(newUser);
  }

  async loginUser({ email, password }: LoginUserDTO) {
    const existingUser = await this.getUser({ email });

    if (!existingUser) {
      throw new AppException(
        'Пользователя не существует',
        HttpStatus.BAD_GATEWAY,
      );
    }

    const equalPassword = await bcrypt.compare(password, existingUser.password);

    if (!equalPassword || existingUser.resetedPassword) {
      throw new AppException('Неверный пароль');
    }

    return {
      token: await this.generateToken(existingUser.id),
      user: this.formatUser(existingUser),
    };
  }

  async getUser(searchParams: { id?: string; email?: string; phone?: string }) {
    const findedUser = await this.prismaService.user.findUnique({
      where: { ...searchParams } as Prisma.UserWhereUniqueInput,
      include: {
        wishlist: true,
        cart: true,
        orders: true
      },
    });

    return findedUser;
  }

  async getMe(id: string) {
    const findedUser = await this.getUser({ id });

    if (!findedUser) {
      throw new AppException(
        'Пользователя не существует',
        HttpStatus.BAD_GATEWAY,
      );
    }

    return this.formatUser(findedUser);
  }

  async requestResetPassword({ email }: ReguestResetPasswordDTO) {
    const existingUser = await this.getUser({ email });
    if (!existingUser) {
      throw new AppException('Пользователя не существует! Ошибка!');
    }
    await this.prismaService.user.update({
      where: { email },
      data: {
        resetedPassword: true,
      },
    });
    //Вот тут отправка на e-mail
    return { message: 'Запрос на смену пароля отправлен на почту' };
  }

  async finishResetPassword({ id, password }: FinishResetPasswordDTO) {
    const existingUser = await this.getUser({ id });
    if (!existingUser || !existingUser.resetedPassword) {
      throw new AppException('Пользователь не запрашивал смену пароля!');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await this.prismaService.user.update({
      where: { id },
      data: {
        password: hashedPassword,
        resetedPassword: false,
      },
    });

    return { message: 'Пароль успешно изменен' };
  }

  // Общий метод для добавления/удаления товара
  private async updateUserProductList(
    userId: string,
    productId: string,
    listType: 'wishlist' | 'cart',
    action: 'connect' | 'disconnect',
  ) {
    // Проверяем, существует ли товар
    await this.productService.getProductById(productId);

    // Обновляем список пользователя
    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: {
        [listType]: {
          [action]: { id: productId },
        },
      },
      include: {
        wishlist: true,
        cart: true,
        orders: true
      },
    });

    return this.formatUser(user);
  }

  // Добавление товара в избранное
  async addToWishlist(userId: string, productId: string) {
    return this.updateUserProductList(userId, productId, 'wishlist', 'connect');
  }

  // Удаление товара из избранного
  async removeFromWishlist(userId: string, productId: string) {
    return this.updateUserProductList(
      userId,
      productId,
      'wishlist',
      'disconnect',
    );
  }

  // Добавление товара в корзину
  async addToCart(userId: string, productId: string) {
    return this.updateUserProductList(userId, productId, 'cart', 'connect');
  }

  // Удаление товара из корзины
  async removeFromCart(userId: string, productId: string) {
    return this.updateUserProductList(userId, productId, 'cart', 'disconnect');
  }

  async generateToken(userID: string) {
    return await this.jwtService.signAsync({ id: userID });
  }

  formatUser(user: Prisma.UserGetPayload<{}>) {
    const parialUser: Partial<Prisma.UserGetPayload<{}>> = { ...user };
    delete parialUser.password;
    const deletedPasswordUser: Omit<
      Prisma.UserGetPayload<{}>,
      'password'
    > = parialUser as Omit<Prisma.UserGetPayload<{}>, 'password'>;
    return deletedPasswordUser;
  }
}
