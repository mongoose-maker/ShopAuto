import { Product } from "../Product/Product.js";

export class CartItem {
  constructor(
    readonly id: string | undefined,
    readonly cartId: string,
    readonly productId: string,
    readonly quantity: number,
    readonly product?: Product
  ) {}
}
