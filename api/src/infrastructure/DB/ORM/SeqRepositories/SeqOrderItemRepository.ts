import type { OrderItemRepository } from "../../../../core/repositories/OrderItem/OrderItemRepository.js";
import { OrderItem } from "../../../../core/models/Order/OrderItem.js";
import SeqOrderItem from "../SeqModel/SeqOrderItemModel.js";
import SeqProduct from "../SeqModel/SeqProductModel.js";
import {
  OrderItemMapper,
  type SeqOrderItemWithRelations,
} from "../../Mapper/MapperOrderItem.js";
import {
  ProductMapper,
  type SeqProductWithRelations,
} from "../../Mapper/MapperProduct.js";

export class SeqOrderItemRepository implements OrderItemRepository {
  async createOrderItem(item: OrderItem): Promise<OrderItem> {
    const itemData = OrderItemMapper.toPersistence(item);
    const createdItem = await SeqOrderItem.create(itemData);

    // Загрузить созданный элемент с продуктом
    const itemWithProduct = await SeqOrderItem.findByPk(createdItem.id, {
      include: [
        {
          model: SeqProduct,
          as: "product",
        },
      ],
    });

    if (!itemWithProduct) {
      throw new Error("OrderItem not found after creation");
    }

    return OrderItemMapper.toDomain(
      itemWithProduct.get({ plain: true }) as SeqOrderItemWithRelations
    );
  }

  async findById(id: string): Promise<OrderItem | null> {
    const item = await SeqOrderItem.findByPk(id, {
      include: [
        {
          model: SeqProduct,
          as: "product",
        },
      ],
    });

    if (!item) {
      return null;
    }

    return OrderItemMapper.toDomain(
      item.get({ plain: true }) as SeqOrderItemWithRelations
    );
  }

  async findByOrderId(orderId: string): Promise<OrderItem | null> {
    // Найти первый элемент заказа (интерфейс требует один элемент, но логичнее вернуть все)
    const item = await SeqOrderItem.findOne({
      where: { orderId },
      include: [
        {
          model: SeqProduct,
          as: "product",
        },
      ],
    });

    if (!item) {
      return null;
    }

    return OrderItemMapper.toDomain(
      item.get({ plain: true }) as SeqOrderItemWithRelations
    );
  }

  async updateOrderItemQuantity(
    orderId: string,
    productId: string,
    newQuantity: number
  ): Promise<OrderItem | null> {
    // Найти элемент заказа
    const item = await SeqOrderItem.findOne({
      where: { orderId, productId },
    });

    if (!item) {
      return null;
    }

    // Вычислить новую общую цену
    const unitPrice = Number(item.unitPrice);
    const totalPrice = unitPrice * newQuantity;

    // Обновить количество и общую цену
    await item.update({
      quantity: newQuantity,
      totalPrice,
    });

    // Загрузить обновленный элемент с продуктом
    const updatedItem = await SeqOrderItem.findByPk(item.id, {
      include: [
        {
          model: SeqProduct,
          as: "product",
        },
      ],
    });

    if (!updatedItem) {
      return null;
    }

    return OrderItemMapper.toDomain(
      updatedItem.get({ plain: true }) as SeqOrderItemWithRelations
    );
  }

  async deleteOrderItem(orderId: string): Promise<boolean> {
    // Удалить все элементы заказа
    const deleted = await SeqOrderItem.destroy({
      where: { orderId },
    });

    return deleted > 0;
  }
}
