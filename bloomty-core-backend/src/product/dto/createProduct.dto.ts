import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  isNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  isString,
  Min,
} from 'class-validator';

export class createProductDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  sku: string;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  basePrice: number;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  color: string;

  @IsOptional()
  @IsNotEmpty()
  onSale?: boolean;

  @IsOptional()
  @IsNotEmpty()
  isFeatured?: boolean;

  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  salePrice?: number;
}
