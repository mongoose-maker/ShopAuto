import { Cart } from '../../../../core/models/Cart/Cart.js';
import { CartItem } from '../../../../core/models/Cart/CartItem.js';
import SeqCart from '../SeqModel/SeqCartModel.js';
import SeqItem from '../SeqModel/SeqItemRepository.js';
import { CartMapper } from '../../Mapper/MapperCart.js';
import { ProductMapper } from '../../Mapper/MapperProduct.js';
import SeqProduct from '../SeqModel/SeqProductModel.js';
import { ItemMapper } from '../../Mapper/MapperItem.js';
export class SeqCartRepository {
    async getByUserId(userId) {
        const cart = await SeqCart.findOne({
            where: { userId },
            include: [
                {
                    model: SeqItem,
                    as: 'items',
                    include: [
                        {
                            model: SeqProduct,
                            as: 'product',
                        },
                    ],
                },
            ],
        });
        if (!cart) {
            return null;
        }
        return CartMapper.toDomain(cart.get({ plain: true }));
    }
    async addItem(userId, productId, quantity) {
        let cart = await SeqCart.findOne({ where: { userId } });
        if (!cart) {
            cart = await SeqCart.create({ userId });
        }
        const product = await SeqProduct.findByPk(productId, {
            include: ['manufacturer', 'category'],
        });
        if (!product) {
            throw new Error(`Product with id ${productId} not found`);
        }
        const productDomain = ProductMapper.toDomain(product.get({ plain: true }));
        const existingItem = await SeqItem.findOne({
            where: { cartId: cart.id, productId },
        });
        if (existingItem) {
            await existingItem.update({
                quantity: existingItem.quantity + quantity,
            });
        }
        else {
            const cartItem = new CartItem(undefined, cart.id, productId, quantity, productDomain);
            const itemData = ItemMapper.toPersistence(cartItem);
            await SeqItem.create(itemData);
        }
        const cartWithItems = await SeqCart.findByPk(cart.id, {
            include: [
                {
                    model: SeqItem,
                    as: 'items',
                    include: [
                        {
                            model: SeqProduct,
                            as: 'product',
                        },
                    ],
                },
            ],
        });
        if (!cartWithItems) {
            throw new Error('Cart not found after adding item');
        }
        return CartMapper.toDomain(cartWithItems.get({ plain: true }));
    }
    async updateItem(userId, itemId, quantity) {
        const cart = await SeqCart.findOne({ where: { userId } });
        if (!cart) {
            throw new Error(`Cart for user ${userId} not found`);
        }
        const item = await SeqItem.findOne({
            where: { id: itemId, cartId: cart.id },
        });
        if (!item) {
            throw new Error(`Item with id ${itemId} not found in cart`);
        }
        await item.update({ quantity });
        const cartWithItems = await SeqCart.findByPk(cart.id, {
            include: [
                {
                    model: SeqItem,
                    as: 'items',
                    include: [
                        {
                            model: SeqProduct,
                            as: 'product',
                        },
                    ],
                },
            ],
        });
        if (!cartWithItems) {
            throw new Error('Cart not found after updating item');
        }
        return CartMapper.toDomain(cartWithItems.get({ plain: true }));
    }
    async removeItem(userId, itemId) {
        const cart = await SeqCart.findOne({ where: { userId } });
        if (!cart) {
            throw new Error(`Cart for user ${userId} not found`);
        }
        const deleted = await SeqItem.destroy({
            where: { id: itemId, cartId: cart.id },
        });
        if (deleted === 0) {
            throw new Error(`Item with id ${itemId} not found in cart`);
        }
        const cartWithItems = await SeqCart.findByPk(cart.id, {
            include: [
                {
                    model: SeqItem,
                    as: 'items',
                    include: [
                        {
                            model: SeqProduct,
                            as: 'product',
                        },
                    ],
                },
            ],
        });
        if (!cartWithItems) {
            throw new Error('Cart not found after removing item');
        }
        return CartMapper.toDomain(cartWithItems.get({ plain: true }));
    }
    async clear(userId) {
        const cart = await SeqCart.findOne({ where: { userId } });
        if (!cart) {
            throw new Error(`Cart for user ${userId} not found`);
        }
        await SeqItem.destroy({ where: { cartId: cart.id } });
    }
}
//# sourceMappingURL=SeqCartRepository.js.map