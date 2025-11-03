import { Product } from "../models/Product/Product.js";
import { Manufacturer } from "../models/Manufacturer/Manufacturer.js";
import { Category } from "../models/Category/Category.js";
import { AddProductDto } from "../repositories/ProductRepository/dto/addProductDto.js";
import type { UpdateProductDto } from "../repositories/ProductRepository/dto/updateProductDto.js";
import type { ProductRepository } from "../repositories/ProductRepository/ProductRepository.js";
import type { ManufacturerRepository } from "../repositories/ManufacturerRepository/ManufacturerRepository.js";
import type { CategoryRepository } from "../repositories/CategoryRepository/CategoryRepository.js";

export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly manufacturerRepository: ManufacturerRepository,
    private readonly categoryRepository: CategoryRepository
  ) {}

  async addProduct(dto: AddProductDto): Promise<Product> {
    // ✅ Проверяем существование manufacturer и category
    const manufacturer = await this.manufacturerRepository.getManufById(
      dto.manufacturerId
    );
    if (!manufacturer) {
      throw new Error(`Manufacturer with id ${dto.manufacturerId} not found`);
    }

    const category = await this.categoryRepository.getCategoryById(
      dto.categoryId
    );
    if (!category) {
      throw new Error(`Category with id ${dto.categoryId} not found`);
    }

    // ✅ Создаем продукт с объектами, а не ID
    const productToAdd = new Product(
      undefined, // id генерируется в БД
      this.generateArticle(), // ✅ Генерируем артикул
      dto.name,
      manufacturer, // ✅ Объект Manufacturer
      category, // ✅ Объект Category
      dto.description,
      dto.price,
      dto.availability,
      dto.rating ?? 0 // ✅ Значение по умолчанию
    );

    return await this.productRepository.addProduct(productToAdd);
  }

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.getAllProducts();
  }

  async getProductById(id: string): Promise<Product | null> {
    return await this.productRepository.getProductById(id);
  }

  async getProductByArticle(article: string): Promise<Product | null> {
    return await this.productRepository.getProductByArticle(article);
  }

  async updateProduct(
    id: string,
    dto: UpdateProductDto
  ): Promise<Product | null> {
    const existingProduct = await this.productRepository.getProductById(id);
    if (!existingProduct) {
      throw new Error(`Product with id ${id} not found`);
    }

    // ✅ Проверяем новые manufacturer/category если они пришли
    let manufacturer = existingProduct.manufacturer;
    if (dto.manufacturerId) {
      const newManufacturer = await this.manufacturerRepository.getManufById(
        dto.manufacturerId
      );
      if (!newManufacturer) {
        throw new Error(`Manufacturer with id ${dto.manufacturerId} not found`);
      }
      manufacturer = newManufacturer;
    }

    let category = existingProduct.category;
    if (dto.categoryId) {
      const newCategory = await this.categoryRepository.getCategoryById(
        dto.categoryId
      );
      if (!newCategory) {
        throw new Error(`Category with id ${dto.categoryId} not found`);
      }
      category = newCategory;
    }

    // ✅ Создаем обновленный продукт
    const updatedProduct = new Product(
      existingProduct.id,
      existingProduct.idProduct,
      dto.name ?? existingProduct.name,
      manufacturer, // ✅ Всегда объект
      category, // ✅ Всегда объект
      dto.description ?? existingProduct.description,
      dto.price ?? existingProduct.price,
      dto.availability ?? existingProduct.availability,
      dto.rating ?? existingProduct.rating
    );

    return await this.productRepository.updateProduct(id, updatedProduct);
  }

  async updateAvailability(
    id: string,
    isAvailable: boolean
  ): Promise<Product | null> {
    const existingProduct = await this.productRepository.getProductById(id);
    if (!existingProduct) {
      throw new Error(`Product with id ${id} not found`);
    }

    const updatedProduct = new Product(
      existingProduct.id,
      existingProduct.idProduct,
      existingProduct.name,
      existingProduct.manufacturer,
      existingProduct.category,
      existingProduct.description,
      existingProduct.price,
      isAvailable, // ✅ Только availability меняем
      existingProduct.rating
    );

    return await this.productRepository.updateProduct(id, updatedProduct);
  }

  async deleteProduct(id: string): Promise<boolean> {
    return await this.productRepository.deleteProduct(id);
  }

  private generateArticle(): string {
    // ✅ Генерация уникального артикула
    return `ART-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
}
