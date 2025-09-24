import { Category } from "../../models/Category/Category";
import { AddCategoryDto } from "./dto/addCategoryDto";
import { UpdateCategoryDto } from "./dto/updateCategoryDto";

export interface CategoryRepository {
  addCategory(dto: AddCategoryDto): Category;
  addSubCategory(dto: AddCategoryDto): Category;
  getAllCategory(): Category;
  getCategoryById(id: string): Category;
  updateCategory(dto: UpdateCategoryDto): Category;
  deleteCategory(id: string): Category;
}
