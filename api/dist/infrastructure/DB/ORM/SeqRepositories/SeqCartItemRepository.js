import { CartItem } from '../../../../core/models/Cart/CartItem.js';
import SeqItem from '../SeqModel/SeqItemRepository.js';
import SeqProduct from '../SeqModel/SeqProductModel.js';
import { ItemMapper } from '../../Mapper/MapperItem.js';
import { ProductMapper } from '../../Mapper/MapperProduct.js';
export class SeqCartItemRepository {
    async addItem(item) {
        const product = await SeqProduct.findByPk(item.productId, {
            include: ['manufacturer', 'category'],
        });
        if (!product) {
            throw new Error(`Product with id ${item.productId} not found`);
        }
        const productDomain = ProductMapper.toDomain(product.get({ plain: true }));
        const existingItem = await SeqItem.findOne({
            where: { cartId: item.cartId, productId: item.productId },
            include: [
                {
                    model: SeqProduct,
                    as: 'product',
                },
            ],
        });
        if (existingItem) {
            await existingItem.update({
                quantity: existingItem.quantity + item.quantity,
            });
            const updatedItem = await SeqItem.findByPk(existingItem.id, {
                include: [
                    {
                        model: SeqProduct,
                        as: 'product',
                    },
                ],
            });
            if (!updatedItem) {
                throw new Error('Item not found after update');
            }
            return ItemMapper.toDomain(updatedItem.get({ plain: true }));
        }
        else {
            const cartItemWithProduct = new CartItem(undefined, item.cartId, item.productId, item.quantity, productDomain);
            const itemData = ItemMapper.toPersistence(cartItemWithProduct);
            const createdItem = await SeqItem.create(itemData);
            const itemWithProduct = await SeqItem.findByPk(createdItem.id, {
                include: [
                    {
                        model: SeqProduct,
                        as: 'product',
                    },
                ],
            });
            if (!itemWithProduct) {
                throw new Error('Item not found after creation');
            }
            return ItemMapper.toDomain(itemWithProduct.get({ plain: true }));
        }
    }
    async updateItem(cartId, productId, quantity) {
        const item = await SeqItem.findOne({
            where: { cartId, productId },
            include: [
                {
                    model: SeqProduct,
                    as: 'product',
                },
            ],
        });
        if (!item) {
            return null;
        }
        await item.update({ quantity });
        const updatedItem = await SeqItem.findByPk(item.id, {
            include: [
                {
                    model: SeqProduct,
                    as: 'product',
                },
            ],
        });
        if (!updatedItem) {
            return null;
        }
        return ItemMapper.toDomain(updatedItem.get({ plain: true }));
    }
    async getItemList(cartId) {
        const items = await SeqItem.findAll({
            where: { cartId },
            include: [
                {
                    model: SeqProduct,
                    as: 'product',
                },
            ],
        });
        return items.map(item => ItemMapper.toDomain(item.get({ plain: true })));
    }
    async removeItem(cartId, productId) {
        const deleted = await SeqItem.destroy({
            where: { cartId, productId },
        });
        return deleted > 0;
    }
    async clearCart(cartId) {
        const deleted = await SeqItem.destroy({
            where: { cartId },
        });
        return deleted > 0;
    }
}
//# sourceMappingURL=SeqCartItemRepository.js.map