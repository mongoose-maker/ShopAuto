import { Product } from "../Product/Product";

export class CartItem {
  constructor(readonly product: Product, readonly quantity: number) {} // ?
}
