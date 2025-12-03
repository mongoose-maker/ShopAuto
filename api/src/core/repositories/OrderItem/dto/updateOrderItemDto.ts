import { IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateOrderItemDto {
  @IsNumber({}, { message: 'Количество должно быть числом' })
  @Min(1, { message: 'Минимальное количество товара: 1' })
  @IsOptional()
  readonly quantity?: number;

  @IsNumber({}, { message: 'Цена должна быть числом' })
  @Min(0, { message: 'Цена не может быть отрицательной' })
  @IsOptional()
  readonly unitPrice?: number;
}
