import type { ProductRepository } from '../../../../core/repositories/ProductRepository/ProductRepository.js';
import SeqProduct from '../SeqModel/SeqProductModel.js';
import { ProductMapper, type SeqProductWithRelations } from '../../Mapper/MapperProduct.js';
import { Product } from '../../../../core/models/Product/Product.js';

export class SeqProductRepository implements ProductRepository {
  async addProduct(product: Product): Promise<Product> {
    const productData = ProductMapper.toPersistence(product);
    const createdProduct = await SeqProduct.create(productData);

    const productWithRelations = await SeqProduct.findByPk(createdProduct.id, {
      include: ['manufacturer', 'category'],
    });

    if (!productWithRelations) {
      throw new Error('Product not found after creation');
    }

    return ProductMapper.toDomain(
      productWithRelations.get({ plain: true }) as SeqProductWithRelations,
    );
  }

  async getAllProducts(): Promise<Product[]> {
    const foundProducts = await SeqProduct.findAll({
      include: ['manufacturer', 'category'],
    });

    return foundProducts.map(prod =>
      ProductMapper.toDomain(prod.get({ plain: true }) as SeqProductWithRelations),
    );
  }

  async getProductById(id: string): Promise<Product | null> {
    const foundProduct = await SeqProduct.findByPk(id, {
      include: ['manufacturer', 'category'],
    });

    if (!foundProduct) {
      return null;
    }

    return ProductMapper.toDomain(foundProduct.get({ plain: true }) as SeqProductWithRelations);
  }

  async getProductByArticle(article: string): Promise<Product | null> {
    const foundProduct = await SeqProduct.findOne({
      where: { idProduct: article },
      include: ['manufacturer', 'category'],
    });

    if (!foundProduct) {
      return null;
    }

    return ProductMapper.toDomain(foundProduct.get({ plain: true }) as SeqProductWithRelations);
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    const existingProduct = await SeqProduct.findByPk(id);

    if (!existingProduct) {
      return null;
    }

    const dataToUpdate = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined),
    );

    await existingProduct.update(dataToUpdate);

    const updatedProduct = await SeqProduct.findByPk(id, {
      include: ['manufacturer', 'category'],
    });

    if (!updatedProduct) {
      return null;
    }

    return ProductMapper.toDomain(updatedProduct.get({ plain: true }) as SeqProductWithRelations);
  }

  async updateAvailability(id: string, isAvailable: boolean): Promise<Product | null> {
    const existingProduct = await SeqProduct.findByPk(id);

    if (!existingProduct) {
      return null;
    }

    await existingProduct.update({ availability: isAvailable });

    const updatedProduct = await SeqProduct.findByPk(id, {
      include: ['manufacturer', 'category'],
    });

    if (!updatedProduct) {
      return null;
    }

    return ProductMapper.toDomain(updatedProduct.get({ plain: true }) as SeqProductWithRelations);
  }

  async deleteProduct(id: string): Promise<boolean> {
    const result = await SeqProduct.destroy({ where: { id } });
    return result > 0;
  }
}
