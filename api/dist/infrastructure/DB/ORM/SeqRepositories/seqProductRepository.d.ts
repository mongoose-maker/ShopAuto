import type { ProductRepository } from '../../../../core/repositories/ProductRepository/ProductRepository.js';
import { Product } from '../../../../core/models/Product/Product.js';
export declare class SeqProductRepository implements ProductRepository {
    addProduct(product: Product): Promise<Product>;
    getAllProducts(): Promise<Product[]>;
    getProductById(id: string): Promise<Product | null>;
    getProductByArticle(article: string): Promise<Product | null>;
    updateProduct(id: string, updates: Partial<Product>): Promise<Product | null>;
    updateAvailability(id: string, isAvailable: boolean): Promise<Product | null>;
    deleteProduct(id: string): Promise<boolean>;
}
//# sourceMappingURL=seqProductRepository.d.ts.map