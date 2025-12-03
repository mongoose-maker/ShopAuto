import { Category } from '../../../../core/models/Category/Category.js';
import type { CategoryRepository } from '../../../../core/repositories/CategoryRepository/CategoryRepository.js';
export declare class SeqCategoryRepository implements CategoryRepository {
    addCategory(category: Category): Promise<Category>;
    getAllCategories(): Promise<Category[]>;
    getCategoryById(id: string): Promise<Category | null>;
    updateCategory(id: string, category: Category): Promise<Category | null>;
    updateCategoryProducts(categoryId: string, productIds: string[]): Promise<Category | null>;
    deleteCategory(id: string): Promise<boolean>;
}
//# sourceMappingURL=SeqCategoryRepository.d.ts.map