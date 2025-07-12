import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
