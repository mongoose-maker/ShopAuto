import { Product } from "../models/Product/Product.js";

import { AddProductDto } from "../repositories/ProductRepository/dto/addProductDto.js";
import type { UpdateProductDto } from "../repositories/ProductRepository/dto/updateProductDto.js";
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

  async getAllProduct(): Promise<Product[]> {
    const existingProducts = await this.productRepository.getAllProduct();
    return existingProducts;
  }

  async getProductById(id: string): Promise<Product | null> {
    const foundProduct = await this.productRepository.getProductById(id);
    return foundProduct;
  }

  async getProductByArticle(idProduct: string): Promise<Product | null> {
    const foundProduct = await this.productRepository.getProductByArticle(
      idProduct
    );
    return foundProduct;
  }

  async updateProduct(
    id: string,
    dto: UpdateProductDto
  ): Promise<Product | null> {
    const existingProduct = await this.productRepository.getProductById(id);
    if (!existingProduct) {
      throw new Error(`Product with id ${id} not found`);
    }
    const updatedProduct = new Product(
      existingProduct.id,
      dto.idProduct ?? existingProduct.idProduct,
      dto.name ?? existingProduct.name,
      existingProduct.manufacturerId, // ?
      existingProduct.categoryId, // ?
      dto.description ?? existingProduct.description,
      dto.price ?? existingProduct.price,
      dto.availability ?? existingProduct.availability,
      dto.reviews ?? existingProduct.reviews,
      dto.rating ?? existingProduct.rating
    );
    return await this.productRepository.updateProduct(id, updatedProduct);
  }

  async statusAvailability(
    id: string,
    isAvailable: boolean
  ): Promise<Product | null> {
    const status = await this.productRepository.statusAvailability(
      id,
      isAvailable
    );
    return status; // Правильно ли это написано?
  }

  async deleteProduct(id: string): Promise<boolean> {
    return await this.productRepository.deleteProduct(id);
  }
}
