import { Cart } from "../../../models/Cart/Cart.js";
import { Product } from "../../../models/Product/Product.js";
import { User } from "../../../models/User/User.js";

export class AddOrderDto {
  constructor(
    readonly quantityItem: Cart,
    readonly priceItemOrder: Product,
    readonly dataBayer: User
  ) {}
}
