import { Product } from "../../../core/models/Product/Product.js";
import type { SeqProductAttributes } from "../ORM/SeqModel/SeqProductModel.js";
import type { SeqManufacturerAttributes } from "../ORM/SeqModel/SeqManufacturerModel.js";
import type { SeqCategoryAttributes } from "../ORM/SeqModel/SeqCategoryModel.js";
import { ManufacturerMapper } from "./MapperManufacturer.js";
import { CategoryMapper } from "./MapperCategory.js";

export type SeqProductWithRelations = SeqProductAttributes & {
  manufacturer?: SeqManufacturerAttributes;
  category?: SeqCategoryAttributes;
};

export class ProductMapper {
  static toDomain(raw: SeqProductWithRelations): Product {
    // ✅ Проверяем обязательные поля
    if (!raw.id) throw new Error("Product ID is required");
    if (!raw.manufacturer)
      throw new Error("Manufacturer is required for product");
    if (!raw.category) throw new Error("Category is required for product");

    const manufacturer = ManufacturerMapper.toDomain(raw.manufacturer);
    const category = CategoryMapper.toDomain(raw.category);

    return new Product(
      raw.id.toString(), // ✅ number -> string
      raw.idProduct,
      raw.name,
      manufacturer,
      category,
      raw.description,
      raw.price,
      raw.availability,
      raw.rating
    );
  }

  static toPersistence(product: Product): Omit<SeqProductAttributes, "id"> {
    // ✅ Проверяем, что ID есть
    if (!product.manufacturer.id)
      throw new Error("Manufacturer ID is required");
    if (!product.category.id) throw new Error("Category ID is required");

    return {
      idProduct: product.idProduct,
      name: product.name,
      manufacturerId: product.manufacturer.id, // ✅ manufacturer должен иметь id
      categoryId: product.category.id, // ✅ category должен иметь id
      description: product.description,
      price: product.price,
      availability: product.availability,
      rating: product.rating,
    };
  }
}
