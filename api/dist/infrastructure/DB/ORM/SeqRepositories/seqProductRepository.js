import SeqProduct from '../SeqModel/SeqProductModel.js';
import { ProductMapper } from '../../Mapper/MapperProduct.js';
import { Product } from '../../../../core/models/Product/Product.js';
export class SeqProductRepository {
    async addProduct(product) {
        const productData = ProductMapper.toPersistence(product);
        const createdProduct = await SeqProduct.create(productData);
        const productWithRelations = await SeqProduct.findByPk(createdProduct.id, {
            include: ['manufacturer', 'category'],
        });
        if (!productWithRelations) {
            throw new Error('Product not found after creation');
        }
        return ProductMapper.toDomain(productWithRelations.get({ plain: true }));
    }
    async getAllProducts() {
        const foundProducts = await SeqProduct.findAll({
            include: ['manufacturer', 'category'],
        });
        return foundProducts.map(prod => ProductMapper.toDomain(prod.get({ plain: true })));
    }
    async getProductById(id) {
        const foundProduct = await SeqProduct.findByPk(id, {
            include: ['manufacturer', 'category'],
        });
        if (!foundProduct) {
            return null;
        }
        return ProductMapper.toDomain(foundProduct.get({ plain: true }));
    }
    async getProductByArticle(article) {
        const foundProduct = await SeqProduct.findOne({
            where: { idProduct: article },
            include: ['manufacturer', 'category'],
        });
        if (!foundProduct) {
            return null;
        }
        return ProductMapper.toDomain(foundProduct.get({ plain: true }));
    }
    async updateProduct(id, updates) {
        const existingProduct = await SeqProduct.findByPk(id);
        if (!existingProduct) {
            return null;
        }
        const dataToUpdate = Object.fromEntries(Object.entries(updates).filter(([_, value]) => value !== undefined));
        await existingProduct.update(dataToUpdate);
        const updatedProduct = await SeqProduct.findByPk(id, {
            include: ['manufacturer', 'category'],
        });
        if (!updatedProduct) {
            return null;
        }
        return ProductMapper.toDomain(updatedProduct.get({ plain: true }));
    }
    async updateAvailability(id, isAvailable) {
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
        return ProductMapper.toDomain(updatedProduct.get({ plain: true }));
    }
    async deleteProduct(id) {
        const result = await SeqProduct.destroy({ where: { id } });
        return result > 0;
    }
}
//# sourceMappingURL=seqProductRepository.js.map