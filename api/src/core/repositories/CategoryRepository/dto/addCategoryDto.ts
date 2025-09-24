import { Category } from "../../../models/Category/Category";
import { Product } from "../../../models/Product/Product";

export class AddCategoryDto {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly subCategory?: Category,
    readonly listProducts: Product[] = []
  ) {}
}
