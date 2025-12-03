import { Category } from '../models/Category/Category.js';
export class CategoryService {
    constructor(categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    async addCategory(dto) {
        const category = new Category(undefined, dto.name);
        const createdCategory = await this.categoryRepository.addCategory(category);
        return createdCategory;
    }
    async getCategoryById(id) {
        return await this.categoryRepository.getCategoryById(id);
    }
    async getAllCategories() {
        return await this.categoryRepository.getAllCategories();
    }
    async updateCategory(id, dto) {
        const existingCategory = await this.categoryRepository.getCategoryById(id);
        if (!existingCategory) {
            throw new Error(`Category with id ${id} not found`);
        }
        const updatedCategory = new Category(existingCategory.id, dto.name ?? existingCategory.name);
        return await this.categoryRepository.updateCategory(id, updatedCategory);
    }
    async updateCategoryProducts(id, productIds) {
        return await this.categoryRepository.updateCategoryProducts(id, productIds);
    }
    async deleteCategory(id) {
        return await this.categoryRepository.deleteCategory(id);
    }
}
//# sourceMappingURL=CategoryService.js.map