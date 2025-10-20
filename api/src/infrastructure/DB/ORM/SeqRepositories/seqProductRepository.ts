import type { ProductRepository } from "../../../../core/repositories/ProductRepository/ProductRepository.js";
import SeqProduct from "../SeqModel/SeqProductModel.js";
import {
  ProductMapper,
  type SeqProductWithRelations,
} from "../../Mapper/MapperProduct.js";
import { Product } from "../../../../core/models/Product/Product.js";
import { AddProductDto } from "../../../../core/repositories/ProductRepository/dto/addProductDto.js";

export class SeqProductRepository implements ProductRepository {
  async addProduct(product: Product): Promise<Product> {
    const productData = ProductMapper.toPersistence(product); // 1. Создаем поля в БД
    const createdProduct = await SeqProduct.create(productData); //2. Заполняем их
    const productWithRelations = await SeqProduct.findByPk(createdProduct.id, {
      include: ["manufacturer", "category"],
    });
    if (!productWithRelations) {
      throw new Error("Product not found after creation");
    }
    return ProductMapper.toDomain(
      //3. Отправляем этот новый объект с заполненными полями обратно в предметную область для его обработки в сервисах, Ну может быть в контроллере...
      productWithRelations!.get({ plain: true }) as SeqProductWithRelations
    );
  }
}
