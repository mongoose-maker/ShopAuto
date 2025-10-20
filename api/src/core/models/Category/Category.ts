import { Product } from "../Product/Product.js";

export class Category {
  constructor(
    readonly id: undefined | string,
    readonly name: string,
    readonly products: Product[] = []
  ) {}
}
