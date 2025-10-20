import { Category } from "../../models/Category/Category.js";
import { UpdateCategoryDto } from "./dto/updateCategoryDto.js";

export interface CategoryRepository {
  addCategory(category: Category): Promise<Category>;
  getAllCategory(): Promise<Category[]>;
  getCategoryById(id: string): Promise<Category | null>;
  updateCategory(id: string, dto: UpdateCategoryDto): Promise<Category | null>;
  deleteCategory(id: string): Promise<boolean>;
}
