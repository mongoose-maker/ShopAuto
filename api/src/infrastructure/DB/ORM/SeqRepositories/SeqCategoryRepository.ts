import { Category } from "../../../../core/models/Category/Category.js";

import type { UpdateCategoryDto } from "../../../../core/repositories/CategoryRepository/dto/updateCategoryDto.js";
import type { CategoryRepository } from "../../../../core/repositories/CategoryRepository/CategoryRepository.js";

import {
  CategoryMapper,
  type SeqCategoryWithProducts,
} from "../../Mapper/MapperCategory.js";

import SeqCategory from "../SeqModel/SeqCategoryModel.js";

export class SeqCategoryRepository implements CategoryRepository {
  async addCategory(category: Category): Promise<Category> {
    const dataToCreate = CategoryMapper.toPersistence(category);
    const createdCategory = await SeqCategory.create(dataToCreate);
    const categoryWithProducts = await SeqCategory.findByPk(
      createdCategory.id,
      {
        include: ["products"],
      }
    );
    if (!categoryWithProducts) {
      throw new Error("category not found after create");
    }
    return CategoryMapper.toDomain(
      categoryWithProducts.get({ plain: true }) as SeqCategoryWithProducts
    );
  }
  async getAllCategory(): Promise<Category[]> {
    const categories = await SeqCategory.findAll({
      include: ["products"],
    });
    return categories.map((cat) =>
      CategoryMapper.toDomain(
        cat.get({ plain: true }) as SeqCategoryWithProducts
      )
    );
  }
  async getCategoryById(id: string): Promise<Category | null> {
    const category = await SeqCategory.findByPk(id, {
      include: ["products"],
    });
    if (!category) {
      return null;
    }
    return CategoryMapper.toDomain(category.get({ plain: true }));
  }
  async updateCategory(
    id: string,
    dto: UpdateCategoryDto
  ): Promise<Category | null> {
    const foundCategory = await SeqCategory.findByPk(id, {
      include: ["products"],
    });
    if (!foundCategory) {
      return null;
    }
    const updatedCategory = await foundCategory.update(dto);
    return CategoryMapper.toDomain(updatedCategory.get({ plain: true }));
  }
  async deleteCategory(id: string): Promise<boolean> {
    const category = await SeqCategory.destroy({ where: { id } });
    return category > 0;
  }
}
