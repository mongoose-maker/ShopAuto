import { Product } from "../models/Product/Product.js";
import { AddProductDto } from "../repositories/ProductRepository/dto/addProductDto.js";
import type { UpdateProductDto } from "../repositories/ProductRepository/dto/updateProductDto.js";
import type { ProductRepository } from "../repositories/ProductRepository/ProductRepository.js";
import type { ManufacturerRepository } from "../repositories/ManufacturerRepository/ManufacturerRepository.js";
import type { CategoryRepository } from "../repositories/CategoryRepository/CategoryRepository.js";
export declare class ProductService {
    private readonly productRepository;
    private readonly manufacturerRepository;
    private readonly categoryRepository;
    constructor(productRepository: ProductRepository, manufacturerRepository: ManufacturerRepository, categoryRepository: CategoryRepository);
    addProduct(dto: AddProductDto): Promise<Product>;
    getAllProducts(): Promise<Product[]>;
    getProductById(id: string): Promise<Product | null>;
    getProductByArticle(article: string): Promise<Product | null>;
    updateProduct(id: string, dto: UpdateProductDto): Promise<Product | null>;
    updateAvailability(id: string, isAvailable: boolean): Promise<Product | null>;
    deleteProduct(id: string): Promise<boolean>;
    private generateArticle;
}
//# sourceMappingURL=ProductService.d.ts.map