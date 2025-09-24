import { Cart } from "../../../models/Cart/Cart";
import { Product } from "../../../models/Product/Product";

export class UpdateOrderDto {
  constructor(readonly quantityItem: Cart, readonly priceItemOrder: Product) {}
}
