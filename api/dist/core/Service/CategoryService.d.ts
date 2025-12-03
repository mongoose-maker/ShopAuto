import { Category } from '../models/Category/Category.js';
import type { CategoryRepository } from '../repositories/CategoryRepository/CategoryRepository.js';
import type { AddCategoryDto } from '../repositories/CategoryRepository/dto/addCategoryDto.js';
import type { UpdateCategoryDto } from '../repositories/CategoryRepository/dto/updateCategoryDto.js';
export declare class CategoryService {
    private readonly categoryRepository;
    constructor(categoryRepository: CategoryRepository);
    addCategory(dto: AddCategoryDto): Promise<Category>;
    getCategoryById(id: string): Promise<Category | null>;
    getAllCategories(): Promise<Category[]>;
    updateCategory(id: string, dto: UpdateCategoryDto): Promise<Category | null>;
    updateCategoryProducts(id: string, productIds: string[]): Promise<Category | null>;
    deleteCategory(id: string): Promise<boolean>;
}
//# sourceMappingURL=CategoryService.d.ts.map