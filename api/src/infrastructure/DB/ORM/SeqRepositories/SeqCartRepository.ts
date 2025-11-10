import type { CartRepository } from "../../../../core/repositories/CartRepository/CartRepository.js";
import { Cart } from "../../../../core/models/Cart/Cart.js";
import { CartItem } from "../../../../core/models/Cart/CartItem.js";
import SeqCart from "../SeqModel/SeqCartModel.js";
import SeqItem from "../SeqModel/SeqItemRepository.js";
import {
  CartMapper,
  type SeqCartWithRelations,
} from "../../Mapper/MapperCart.js";
import {
  ProductMapper,
  type SeqProductWithRelations,
} from "../../Mapper/MapperProduct.js";
import SeqProduct from "../SeqModel/SeqProductModel.js";
import { ItemMapper } from "../../Mapper/MapperItem.js";

export class SeqCartRepository implements CartRepository {
  async getByUserId(userId: string): Promise<Cart | null> {
    const cart = await SeqCart.findOne({
      where: { userId },
      include: [
        {
          model: SeqItem,
          as: "items",
          include: [
            {
              model: SeqProduct,
              as: "product",
            },
          ],
        },
      ],
    });

    if (!cart) {
      return null;
    }

    return CartMapper.toDomain(
      cart.get({ plain: true }) as SeqCartWithRelations
    );
  }

  async addItem(
    userId: string,
    productId: string,
    quantity: number
  ): Promise<Cart> {
    // Найти или создать корзину для пользователя
    let cart = await SeqCart.findOne({ where: { userId } });

    if (!cart) {
      cart = await SeqCart.create({ userId });
    }

    // Проверить существование продукта и получить его цену
    const product = await SeqProduct.findByPk(productId, {
      include: ["manufacturer", "category"],
    });

    if (!product) {
      throw new Error(`Product with id ${productId} not found`);
    }

    const productDomain = ProductMapper.toDomain(
      product.get({ plain: true }) as SeqProductWithRelations
    );

    // Проверить, есть ли уже такой товар в корзине
    const existingItem = await SeqItem.findOne({
      where: { cartId: cart.id, productId },
    });

    if (existingItem) {
      // Обновить количество существующего товара
      await existingItem.update({
        quantity: existingItem.quantity + quantity,
      });
    } else {
      // Создать новый элемент корзины
      const cartItem = new CartItem(
        undefined,
        cart.id,
        productId,
        quantity,
        productDomain
      );

      const itemData = ItemMapper.toPersistence(cartItem);
      await SeqItem.create(itemData);
    }

    // Загрузить корзину с элементами
    const cartWithItems = await SeqCart.findByPk(cart.id, {
      include: [
        {
          model: SeqItem,
          as: "items",
          include: [
            {
              model: SeqProduct,
              as: "product",
            },
          ],
        },
      ],
    });

    if (!cartWithItems) {
      throw new Error("Cart not found after adding item");
    }

    return CartMapper.toDomain(
      cartWithItems.get({ plain: true }) as SeqCartWithRelations
    );
  }

  async updateItem(
    userId: string,
    itemId: string,
    quantity: number
  ): Promise<Cart> {
    // Найти корзину пользователя
    const cart = await SeqCart.findOne({ where: { userId } });

    if (!cart) {
      throw new Error(`Cart for user ${userId} not found`);
    }

    // Найти элемент корзины
    const item = await SeqItem.findOne({
      where: { id: itemId, cartId: cart.id },
    });

    if (!item) {
      throw new Error(`Item with id ${itemId} not found in cart`);
    }

    // Обновить количество
    await item.update({ quantity });

    // Загрузить корзину с элементами
    const cartWithItems = await SeqCart.findByPk(cart.id, {
      include: [
        {
          model: SeqItem,
          as: "items",
          include: [
            {
              model: SeqProduct,
              as: "product",
            },
          ],
        },
      ],
    });

    if (!cartWithItems) {
      throw new Error("Cart not found after updating item");
    }

    return CartMapper.toDomain(
      cartWithItems.get({ plain: true }) as SeqCartWithRelations
    );
  }

  async removeItem(userId: string, itemId: string): Promise<Cart> {
    // Найти корзину пользователя
    const cart = await SeqCart.findOne({ where: { userId } });

    if (!cart) {
      throw new Error(`Cart for user ${userId} not found`);
    }

    // Удалить элемент корзины
    const deleted = await SeqItem.destroy({
      where: { id: itemId, cartId: cart.id },
    });

    if (deleted === 0) {
      throw new Error(`Item with id ${itemId} not found in cart`);
    }

    // Загрузить корзину с элементами
    const cartWithItems = await SeqCart.findByPk(cart.id, {
      include: [
        {
          model: SeqItem,
          as: "items",
          include: [
            {
              model: SeqProduct,
              as: "product",
            },
          ],
        },
      ],
    });

    if (!cartWithItems) {
      throw new Error("Cart not found after removing item");
    }

    return CartMapper.toDomain(
      cartWithItems.get({ plain: true }) as SeqCartWithRelations
    );
  }

  async clear(userId: string): Promise<void> {
    // Найти корзину пользователя
    const cart = await SeqCart.findOne({ where: { userId } });

    if (!cart) {
      throw new Error(`Cart for user ${userId} not found`);
    }

    // Удалить все элементы корзины
    await SeqItem.destroy({ where: { cartId: cart.id } });
  }
}
