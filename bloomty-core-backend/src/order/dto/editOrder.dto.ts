import { IsArray, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class EditOrderDto {
    @IsNotEmpty()
    @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsString()
    @IsOptional()
    comment?: string;

    @IsString()
    @IsOptional()
    review?: string;

    @IsString()
    @IsOptional()
    status?: string;
}