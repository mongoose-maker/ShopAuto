import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';

export class AddItemDto {
  @IsUUID('4', { message: 'ID корзины должен быть валидным UUID' })
  @IsNotEmpty({ message: 'ID корзины не может быть пустым' })
  readonly cartId!: string;

  @IsUUID('4', { message: 'ID товара должен быть валидным UUID' })
  @IsNotEmpty({ message: 'ID товара не может быть пустым' })
  readonly productId!: string;

  @IsNumber({}, { message: 'количество должно быть числом' })
  @Min(1, { message: 'Минимальное количество: 1' })
  readonly quantity!: number;
}
