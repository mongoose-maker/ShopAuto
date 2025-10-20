import { Product } from "../models/Product/Product.js";

import { AddProductDto } from "../repositories/ProductRepository/dto/addProductDto.js";
import type { ProductRepository } from "../repositories/ProductRepository/ProductRepository.js";

export class ProductService {
  constructor(readonly productRepository: ProductRepository) {}
  async addProduct(dto: AddProductDto): Promise<Product> {
    const productToAdd = new Product(
      undefined,
      undefined,
      dto.name,
      dto.manufacturerId,
      dto.categoryId,
      dto.description,
      dto.price,
      dto.availability,
      dto.reviews,
      dto.rating
    );
    const createdProduct = await this.productRepository.addProduct(
      productToAdd
    );
    return createdProduct;
  }
}
