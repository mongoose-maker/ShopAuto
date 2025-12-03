import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AddOrderItemDto {
  @IsUUID('4', { message: 'ID товара должен быть валидным UUID' })
  @IsNotEmpty({ message: 'ID товара не может быть пустым' })
  readonly productId!: string;

  @IsNumber({}, { message: 'Количество должно быть числом' })
  @Min(1, { message: 'Минимальное количество товара: 1' })
  readonly quantity!: number;

  @IsNumber({}, { message: 'Цена должна быть числом' })
  @Min(0, { message: 'Цена не может быть отрицательной' })
  //@IsPositive
  readonly unitPrice!: number;
}

export class AddOrderDto {
  @IsUUID('4', { message: 'ID пользователя должен быть валидным UUID' })
  @IsNotEmpty({ message: 'ID пользователя обязателен' })
  readonly userId!: string;

  @IsArray({ message: 'Список позиций должен быть массивом' })
  @ArrayMinSize(1, { message: 'В заказе должна быть минимум одна позиция' })
  @ValidateNested({ each: true })
  @Type(() => AddOrderItemDto)
  readonly items!: AddOrderItemDto[];

  @IsNumber({}, { message: 'Сумма заказа должна быть числом' })
  @Min(0, { message: 'Сумма заказа не может быть отрицательной' })
  readonly totalAmount!: number;

  @IsUUID('4', { message: 'ID адреса должен быть валидным UUID' })
  @IsOptional()
  readonly addressId?: string;

  @IsUUID('4', { message: 'ID корзины должен быть валидным UUID' })
  @IsOptional()
  readonly cartId?: string;
}
