import { Cart } from "../../../models/Cart/Cart";
import { Product } from "../../../models/Product/Product";
import { User } from "../../../models/User/User";

export class AddOrderDto {
  constructor(
    readonly quantityItem: Cart,
    readonly priceItemOrder: Product,
    readonly dataBayer: User
  ) {}
}
