import { Product } from '../../models/Product/Product.js';
export interface ProductRepository {
    addProduct(product: Product): Promise<Product>;
    getAllProducts(): Promise<Product[]>;
    getProductById(id: string): Promise<Product | null>;
    getProductByArticle(article: string): Promise<Product | null>;
    updateProduct(id: string, updates: Partial<Product>): Promise<Product | null>;
    updateAvailability(id: string, isAvailable: boolean): Promise<Product | null>;
    deleteProduct(id: string): Promise<boolean>;
}
//# sourceMappingURL=ProductRepository.d.ts.map