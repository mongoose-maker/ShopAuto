import { Category } from '../models/Category/Category.js';
import type { CategoryRepository } from '../repositories/CategoryRepository/CategoryRepository.js';
import type { AddCategoryDto } from '../repositories/CategoryRepository/dto/addCategoryDto.js';
import type { UpdateCategoryDto } from '../repositories/CategoryRepository/dto/updateCategoryDto.js';

export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async addCategory(dto: AddCategoryDto): Promise<Category> {
    const category = new Category(undefined, dto.name);
    const createdCategory = await this.categoryRepository.addCategory(category);
    return createdCategory;
  }

  async getCategoryById(id: string): Promise<Category | null> {
    return await this.categoryRepository.getCategoryById(id);
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepository.getAllCategories();
  }

  async updateCategory(id: string, dto: UpdateCategoryDto): Promise<Category | null> {
    const existingCategory = await this.categoryRepository.getCategoryById(id);
    if (!existingCategory) {
      throw new Error(`Category with id ${id} not found`);
    }

    const updatedCategory = new Category(existingCategory.id, dto.name ?? existingCategory.name);

    return await this.categoryRepository.updateCategory(id, updatedCategory);
  }

  async updateCategoryProducts(id: string, productIds: string[]): Promise<Category | null> {
    return await this.categoryRepository.updateCategoryProducts(id, productIds);
  }

  async deleteCategory(id: string): Promise<boolean> {
    return await this.categoryRepository.deleteCategory(id);
  }
}
