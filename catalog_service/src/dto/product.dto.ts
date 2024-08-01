import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductRequest {
  @IsString()
  id: string
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  description: string;
  @IsNumber()
  stock: number;
  @IsNumber()
  @Min(1)
  price: number
}

export class UpdateProductRequest {
  name?: string;
  description?: string;
  stock?: number;
  @Min(1)
  price?: number
}