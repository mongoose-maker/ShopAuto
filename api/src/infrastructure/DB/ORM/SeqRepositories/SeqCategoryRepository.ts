import { Category } from '../../../../core/models/Category/Category.js';

import type { CategoryRepository } from '../../../../core/repositories/CategoryRepository/CategoryRepository.js';

import { CategoryMapper, type SeqCategoryWithProducts } from '../../Mapper/MapperCategory.js';

import { SeqProduct, SeqCategory } from '../../Associations/associations.js';

export class SeqCategoryRepository implements CategoryRepository {
  async addCategory(category: Category): Promise<Category> {
    const dataToCreate = CategoryMapper.toPersistence(category);
    const createdCategory = await SeqCategory.create(dataToCreate);
    const categoryWithProducts = await SeqCategory.findByPk(createdCategory.id, {
      include: ['products'],
    });
    if (!categoryWithProducts) {
      throw new Error('category not found after create');
    }
    return CategoryMapper.toDomain(
      categoryWithProducts.get({ plain: true }) as SeqCategoryWithProducts,
    );
  }

  async getAllCategories(): Promise<Category[]> {
    const categories = await SeqCategory.findAll({
      include: ['products'],
    });
    return categories.map(cat =>
      CategoryMapper.toDomain(cat.get({ plain: true }) as SeqCategoryWithProducts),
    );
  }

  async getCategoryById(id: string): Promise<Category | null> {
    const category = await SeqCategory.findByPk(id, {
      include: ['products'],
    });
    if (!category) {
      return null;
    }
    return CategoryMapper.toDomain(category.get({ plain: true }));
  }

  async updateCategory(id: string, category: Category): Promise<Category | null> {
    const foundCategory = await SeqCategory.findByPk(id);
    if (!foundCategory) {
      return null;
    }

    await foundCategory.update({
      name: category.name,
    });

    const updatedCategory = await SeqCategory.findByPk(id);
    return updatedCategory ? CategoryMapper.toDomain(updatedCategory.get({ plain: true })) : null;
  }

  async updateCategoryProducts(categoryId: string, productIds: string[]): Promise<Category | null> {
    const foundCategory = await SeqCategory.findByPk(categoryId, {
      include: ['products'],
    });

    if (!foundCategory) {
      throw new Error(`Category with id ${categoryId} not found`);
    }

    if (productIds && productIds.length > 0) {
      const products = await SeqProduct.findAll({
        where: { id: productIds },
      });
      await foundCategory.setProducts(products);
    }

    const updatedCategory = await SeqCategory.findByPk(categoryId, {
      include: ['products'],
    });

    return updatedCategory ? CategoryMapper.toDomain(updatedCategory.get({ plain: true })) : null;
  }
  async deleteCategory(id: string): Promise<boolean> {
    const category = await SeqCategory.destroy({ where: { id } });
    return category > 0;
  }
}
