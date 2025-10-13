import { Product } from "../Product/Product.js";

export class Category {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly subCategory?: Category,
    readonly listProducts: Product[] = []
  ) {}
}
