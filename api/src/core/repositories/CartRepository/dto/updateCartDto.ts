import { CartItem } from "../../../models/CartItem/CartItem";
import { Product } from "../../../models/Product/Product";

export class UpdateCartDto {
  constructor(readonly quantity: CartItem, readonly idProduct: Product) {} // ?  или cart
}
