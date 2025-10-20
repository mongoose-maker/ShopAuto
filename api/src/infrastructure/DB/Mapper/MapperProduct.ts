import { Product } from "../../../core/models/Product/Product.js";
import { Category } from "../../../core/models/Category/Category.js";
import { Manufacturer } from "../../../core/models/Manufacturer/Manufacturer.js";

import type { SeqProductAttributes } from "../ORM/SeqModel/SeqProductModel.js";
import type { SeqManufacturerAttributes } from "../ORM/SeqModel/SeqManufacturerModel.js";
import type { SeqCategoryAttributes } from "../ORM/SeqModel/SeqCategoryModel.js";

import { ManufacturerMapper } from "./MapperManufacturer.js";
import { CategoryMapper } from "./MapperCategory.js";

export type SeqProductWithRelations = SeqProductAttributes & {
  manufacturer: SeqManufacturerAttributes;
  category: SeqCategoryAttributes;
};

export class ProductMapper {
  static toDomain(raw: SeqProductWithRelations): Product {
    const manufacturer = ManufacturerMapper.toDomain(raw.manufacturer);
    const category = CategoryMapper.toDomain(raw.category); // заменить raw.category на raw.categoryId
    return new Product(
      raw.id,
      raw.idProduct,
      raw.name,
      manufacturer, //?
      category, // raw.listProducts, raw.subCategory
      raw.description,
      raw.price,
      raw.availability,
      raw.reviews,
      raw.rating
    );
  }
  static toPersistence(
    product: Product
  ): Omit<SeqProductAttributes, "id" | "idProduct"> {
    // надо подумать еще что делать с idProduct и manufacturer
    return {
      name: product.name,
      manufacturerId: product.manufacturerId.id,
      categoryId: product.categoryId.id,
      description: product.description,
      price: product.price,
      availability: product.availability,
      reviews: product.reviews,
      rating: product.rating,
    };
  }
}
