import { Category } from "../../models/Category/Category.js";
import { AddCategoryDto } from "./dto/addCategoryDto.js";
import { UpdateCategoryDto } from "./dto/updateCategoryDto.js";

export interface CategoryRepository {
  addCategory(dto: AddCategoryDto): Category;
  addSubCategory(dto: AddCategoryDto): Category;
  getAllCategory(): Category;
  getCategoryById(id: string): Category;
  updateCategory(dto: UpdateCategoryDto): Category;
  deleteCategory(id: string): Category;
}
