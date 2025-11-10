import { Category } from "../../../core/models/Category/Category.js";
import type { SeqCategoryAttributes } from "../ORM/SeqModel/SeqCategoryModel.js";
import {
  ProductMapper,
  type SeqProductWithRelations,
} from "./MapperProduct.js";

export type SeqCategoryWithProducts = SeqCategoryAttributes & {
  products?: SeqProductWithRelations[];
};

export class CategoryMapper {
  static toDomain(raw: SeqCategoryWithProducts): Category {
    const products = raw.products
      ? raw.products.map(ProductMapper.toDomain)
      : [];
    return new Category(raw.id?.toString(), raw.name);
  }
  static toPersistence(category: Category): any {
    return {
      id: category.id,
      name: category.name,
    };
  }
}
