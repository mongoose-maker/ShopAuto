import { Cart } from "../../../models/Cart/Cart.js";
import { Product } from "../../../models/Product/Product.js";

export class UpdateOrderDto {
  constructor(readonly quantityItem: Cart, readonly priceItemOrder: Product) {}
}
