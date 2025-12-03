import { Category } from '../../models/Category/Category.js';
export interface CategoryRepository {
  addCategory(category: Category): Promise<Category>;
  getCategoryById(id: string): Promise<Category | null>;
  getAllCategories(): Promise<Category[]>;
  updateCategory(id: string, category: Category): Promise<Category | null>;
  updateCategoryProducts(id: string, productIds: string[]): Promise<Category | null>;
  deleteCategory(id: string): Promise<boolean>;
}
