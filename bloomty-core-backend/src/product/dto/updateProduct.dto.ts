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

export class updateProductDTO {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  sku: string;

  @IsInt()
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  basePrice: number;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  category: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  color: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  onSale?: boolean;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  isFeatured?: boolean;

  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  salePrice?: number;
}
