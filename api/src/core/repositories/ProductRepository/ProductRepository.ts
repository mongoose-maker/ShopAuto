import { Product } from "../../models/Product/Product.js";

export interface ProductRepository {
  addProduct(product: Product): Promise<Product>;
  getAllProducts(): Promise<Product[]>; // ✅ Исправил на getAllProducts
  getProductById(id: string): Promise<Product | null>;
  getProductByArticle(article: string): Promise<Product | null>; // ✅ Лучшее название
  updateProduct(id: string, updates: Partial<Product>): Promise<Product | null>; // ✅ Убрал зависимость от DTO
  updateAvailability(id: string, isAvailable: boolean): Promise<Product | null>; // ✅ Исправил название
  deleteProduct(id: string): Promise<boolean>; // ✅ Раскомментировал
}
