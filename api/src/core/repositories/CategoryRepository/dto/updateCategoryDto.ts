import { Category } from "../../../models/Category/Category";
import { Product } from "../../../models/Product/Product";

export class UpdateCategoryDto {
  constructor(
    readonly name: string,
    readonly subCategory?: Category,
    readonly listProducts: Product[] = []
  ) {}
}
