import type { ProductRepository } from "../../../../core/repositories/ProductRepository/ProductRepository.js";
import SeqProduct from "../SeqModel/SeqProductModel.js";
import {
  ProductMapper,
  type SeqProductWithRelations,
} from "../../Mapper/MapperProduct.js";
import { Product } from "../../../../core/models/Product/Product.js";
import type { UpdateProductDto } from "../../../../core/repositories/ProductRepository/dto/updateProductDto.js";

export class SeqProductRepository implements ProductRepository {
  async addProduct(product: Product): Promise<Product> {
    const productData = ProductMapper.toPersistence(product);
    const createdProduct = await SeqProduct.create(productData);
    const productWithRelations = await SeqProduct.findByPk(createdProduct.id, {
      include: ["manufacturer", "category"],
    });
    if (!productWithRelations) {
      throw new Error("Product not found after creation");
    }
    return ProductMapper.toDomain(
      productWithRelations!.get({ plain: true }) as SeqProductWithRelations
    );
  }

  async getAllProduct(): Promise<Product[]> {
    const foundProducts = await SeqProduct.findAll({
      include: ["manufacturers", "categories"],
    });
    return foundProducts.map((prod) =>
      ProductMapper.toDomain(
        prod.get({ plain: true }) as SeqProductWithRelations
      )
    );
  }

  async getProductById(id: string): Promise<Product | null> {
    const foundProduct = await SeqProduct.findByPk(id, {
      include: ["manufacturers", "categories"],
    });
    if (!foundProduct) {
      return null;
    }
    return ProductMapper.toDomain(
      foundProduct.get({ plain: true }) as SeqProductWithRelations
    );
  }

  async getProductByArticle(idProduct: string): Promise<Product | null> {
    const foundProduct = await SeqProduct.findOne({
      where: { idProduct },
      include: ["manufacturers", "categories"],
    });
    if (!foundProduct) {
      return null;
    }
    return ProductMapper.toDomain(
      foundProduct.get({ plain: true }) as SeqProductWithRelations
    );
  }

  async updateProduct(
    id: string,
    dto: UpdateProductDto
  ): Promise<Product | null> {
    const existingProduct = await SeqProduct.findByPk(id, {
      include: ["manufacturers", "categories"],
    });
    if (!existingProduct) {
      return null;
    }
    const updatedProduct = await existingProduct.update(dto);
    return ProductMapper.toDomain(
      updatedProduct.get({ plain: true }) as SeqProductWithRelations
    );
  }

  async statusAvailability(
    id: string,
    isAvailable: boolean
  ): Promise<Product | null> {
    const existingProduct = await SeqProduct.findByPk(id, {
      include: ["manufacturers", "categories"],
    });
    if (!existingProduct) {
      return null;
    }
    const status = await existingProduct.update({ availability: isAvailable });
    return ProductMapper.toDomain(
      status.get({ plain: true }) as SeqProductWithRelations
    );
  }

  async deleteProduct(id: string): Promise<boolean> {
    const existingProduct = await SeqProduct.destroy({ where: { id } });
    return existingProduct > 0;
  }
}
