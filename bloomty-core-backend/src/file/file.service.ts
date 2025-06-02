import { Global, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import * as sharp from 'sharp';

export enum FileType {
  AUDIO = 'audio',
  IMAGE = 'image',
}

@Injectable()
@Global()
export class FileService {
  async createFile(type: FileType, file): Promise<string> {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileExtension;
      const filePath = path.resolve(__dirname, '..', 'static', type);

      // Создаем директорию, если она не существует
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      // Полный путь к файлу
      const fullFilePath = path.resolve(filePath, fileName);

      // Если файл является изображением, сжимаем его
      if (type === FileType.IMAGE) {
        await sharp(file.buffer)
          .resize(640, 640, {
            fit: 'inside', // Сохраняет пропорции, не выходя за пределы 640x640
            withoutEnlargement: true, // Не увеличивает изображение, если оно меньше 640x640
          })
          .toFormat('jpeg', { quality: 100 }) // Конвертируем в JPEG с качеством 80%
          .toFile(fullFilePath);
      } else {
        // Если это не изображение, сохраняем как есть
        fs.writeFileSync(fullFilePath, file.buffer);
      }

      return type + '/' + fileName;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createFiles(type: FileType, files: File[]): Promise<string[]> {
    const links: string[] = [];
    for (const file of files) {
      const uploadedFileLink = await this.createFile(type, file);
      links.push(uploadedFileLink);
    }
    return links;
  }

  removeFile(fileName: string) { }
}
