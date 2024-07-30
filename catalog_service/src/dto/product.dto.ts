import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateProductRequest {
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