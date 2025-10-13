import { CartItem } from "../../../models/CartItem/CartItem.js";
import { Product } from "../../../models/Product/Product.js";

export class UpdateCartDto {
  constructor(readonly quantity: CartItem, readonly idProduct: Product) {} // ?  или cart
}
