import { Product } from "../Product/Product.js";

export class CartItem {
  constructor(readonly product: Product, readonly quantity: number) {} // ?
}
