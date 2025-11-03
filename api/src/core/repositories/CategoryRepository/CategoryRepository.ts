import { Category } from "../../models/Category/Category.js";
import { UpdateCategoryDto } from "./dto/updateCategoryDto.js";

export interface CategoryRepository {
  addCategory(category: Category): Promise<Category>;
  getCategoryById(id: string): Promise<Category | null>;
  getAllCategories(): Promise<Category[]>;
  updateCategory(id: string, category: Category): Promise<Category | null>; // ✅ Для имени/описания
  updateCategoryProducts(
    id: string,
    productIds: string[]
  ): Promise<Category | null>; // ✅ Для продуктов
  deleteCategory(id: string): Promise<boolean>;
}
