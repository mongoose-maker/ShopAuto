import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class AddOrderItemDto {
  @IsUUID('4', { message: 'ID товара должен быть валидным UUID' })
  @IsNotEmpty({ message: 'ID товара не может быть пустым' })
  readonly productId!: string;

  @IsNumber({}, { message: 'Количество должно быть числом' })
  @Min(1, { message: 'Минимальное количество товара: 1' })
  readonly quantity!: number;

  @IsNumber({}, { message: 'Цена должна быть числом' })
  @Min(0, { message: 'Цена не может быть отрицательной' })
  readonly unitPrice!: number;
}
