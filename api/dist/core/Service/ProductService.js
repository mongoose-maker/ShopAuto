import { Product } from '../models/Product/Product.js';
import { AddProductDto } from '../repositories/ProductRepository/dto/addProductDto.js';
export class ProductService {
    constructor(productRepository, manufacturerRepository, categoryRepository) {
        this.productRepository = productRepository;
        this.manufacturerRepository = manufacturerRepository;
        this.categoryRepository = categoryRepository;
    }
    async addProduct(dto) {
        const manufacturer = await this.manufacturerRepository.getManufById(dto.manufacturerId);
        if (!manufacturer) {
            throw new Error(`Manufacturer with id ${dto.manufacturerId} not found`);
        }
        const category = await this.categoryRepository.getCategoryById(dto.categoryId);
        if (!category) {
            throw new Error(`Category with id ${dto.categoryId} not found`);
        }
        const productToAdd = new Product(undefined, this.generateArticle(), dto.name, manufacturer, category, dto.description, dto.price, dto.availability, dto.rating ?? 0);
        return await this.productRepository.addProduct(productToAdd);
    }
    async getAllProducts() {
        return await this.productRepository.getAllProducts();
    }
    async getProductById(id) {
        return await this.productRepository.getProductById(id);
    }
    async getProductByArticle(article) {
        return await this.productRepository.getProductByArticle(article);
    }
    async updateProduct(id, dto) {
        const existingProduct = await this.productRepository.getProductById(id);
        if (!existingProduct) {
            throw new Error(`Product with id ${id} not found`);
        }
        let manufacturer = existingProduct.manufacturer;
        if (dto.manufacturerId) {
            const newManufacturer = await this.manufacturerRepository.getManufById(dto.manufacturerId);
            if (!newManufacturer) {
                throw new Error(`Manufacturer with id ${dto.manufacturerId} not found`);
            }
            manufacturer = newManufacturer;
        }
        let category = existingProduct.category;
        if (dto.categoryId) {
            const newCategory = await this.categoryRepository.getCategoryById(dto.categoryId);
            if (!newCategory) {
                throw new Error(`Category with id ${dto.categoryId} not found`);
            }
            category = newCategory;
        }
        const updatedProduct = new Product(existingProduct.id, existingProduct.idProduct, dto.name ?? existingProduct.name, manufacturer, category, dto.description ?? existingProduct.description, dto.price ?? existingProduct.price, dto.availability ?? existingProduct.availability, dto.rating ?? existingProduct.rating);
        return await this.productRepository.updateProduct(id, updatedProduct);
    }
    async updateAvailability(id, isAvailable) {
        const existingProduct = await this.productRepository.getProductById(id);
        if (!existingProduct) {
            throw new Error(`Product with id ${id} not found`);
        }
        const updatedProduct = new Product(existingProduct.id, existingProduct.idProduct, existingProduct.name, existingProduct.manufacturer, existingProduct.category, existingProduct.description, existingProduct.price, isAvailable, existingProduct.rating);
        return await this.productRepository.updateProduct(id, updatedProduct);
    }
    async deleteProduct(id) {
        return await this.productRepository.deleteProduct(id);
    }
    generateArticle() {
        return `ART-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    }
}
//# sourceMappingURL=ProductService.js.map