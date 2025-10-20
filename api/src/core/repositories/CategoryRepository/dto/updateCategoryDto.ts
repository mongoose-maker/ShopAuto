import { Category } from "../../../models/Category/Category.js";
import { Product } from "../../../models/Product/Product.js";

export class UpdateCategoryDto {
  constructor(readonly name: string, readonly products: Product[] = []) {}
}
