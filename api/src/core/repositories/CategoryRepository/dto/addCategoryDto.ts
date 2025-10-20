import { Category } from "../../../models/Category/Category.js";
import { Product } from "../../../models/Product/Product.js";

export class AddCategoryDto {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly products: Product[] = []
  ) {}
}
