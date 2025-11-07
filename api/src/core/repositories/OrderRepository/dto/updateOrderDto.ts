import { IsIn, IsNotEmpty, IsOptional, IsUUID } from "class-validator";
import { ORDER_STATUSES } from "../../../models/Order/Order.js";

export class UpdateOrderDto {
  @IsUUID("4", { message: "ID заказа должен быть валидным UUID" })
  @IsNotEmpty({ message: "ID заказа обязателен" })
  readonly orderId!: string;

  @IsIn(ORDER_STATUSES, {
    message: `Недопустимый статус заказа. Возможные значения: ${ORDER_STATUSES.join(
      ", "
    )}`,
  })
  readonly status!: (typeof ORDER_STATUSES)[number];

  @IsUUID("4", { message: "ID адреса должен быть валидным UUID" })
  @IsOptional()
  readonly addressId?: string;
}
