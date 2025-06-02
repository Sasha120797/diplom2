import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Injectable,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { AppException } from './app.exception';
import { ValidationError } from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';

@Catch()
@Injectable()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly prismaService: PrismaService) {}

  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message =
      'Произошла ошибка приложения, мы уже работаем над устранением';
    let stack: string | undefined;
    const timeStamp = new Date().toISOString();

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const responseMessage = exception.getResponse();

      // Обработка ошибок валидации
      if (Array.isArray((responseMessage as any).message)) {
        message = this.formatValidationErrors((responseMessage as any).message);
      } else {
        message =
          typeof responseMessage === 'string'
            ? responseMessage
            : (responseMessage as any).message;
      }
    } else if (exception instanceof AppException) {
      status = exception.getStatus();
      message = exception.getResponse() as string;
    } else {
      // Если это обычная ошибка, сохраняем стек вызовов
      stack = exception.stack;
    }

    // Логирование ошибки в базу данных
    await this.logError(
      ctx.getRequest().url,
      JSON.stringify(exception),
      timeStamp,
      stack,
    );

    response.status(status).json({
      statusCode: status,
      message: message,
      timestamp: timeStamp,
      path: ctx.getRequest().url,
    });
  }

  private formatValidationErrors(errors: ValidationError[]): string {
    return errors.join('; ');
  }

  private async logError(
    path: string,
    exception: string,
    timestamp: string,
    stack?: string,
  ) {
    try {
      await this.prismaService.errorLog.create({
        data: {
          path,
          exception: stack ? `${exception}\n${stack}` : exception, // Сохраняем стек вызовов, если он есть
          timestamp,
        },
      });
    } catch (error) {
      console.error('Ошибка при записи лога:', error);
    }
  }
}
