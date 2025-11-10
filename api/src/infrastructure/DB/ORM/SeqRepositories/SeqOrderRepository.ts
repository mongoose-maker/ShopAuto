import type { OrderRepository } from "../../../../core/repositories/OrderRepository/OrderRepository.js";
import {
  Order,
  type OrderStatus,
} from "../../../../core/models/Order/Order.js";
import { OrderItem } from "../../../../core/models/Order/OrderItem.js";
import SeqOrder from "../SeqModel/SeqOrderModel.js";
import SeqOrderItem from "../SeqModel/SeqOrderItemModel.js";
import SeqCart from "../SeqModel/SeqCartModel.js";
import SeqItem from "../SeqModel/SeqItemRepository.js";
import SeqProduct from "../SeqModel/SeqProductModel.js";
import {
  OrderMapper,
  type SeqOrderWithRelations,
} from "../../Mapper/MapperOrder.js";
import { OrderItemMapper } from "../../Mapper/MapperOrderItem.js";

export class SeqOrderRepository implements OrderRepository {
  async save(order: Order): Promise<Order> {
    // Сохранить заказ
    const orderData = OrderMapper.toPersistence(order);
    const createdOrder = await SeqOrder.create(orderData);

    // Сохранить элементы заказа
    if (order.items && order.items.length > 0) {
      const orderItemsData = order.items.map((item) => {
        // Создать OrderItem с установленным orderId для сохранения
        const itemWithOrderId = new OrderItem(
          item.id,
          createdOrder.id, // Установить orderId
          item.productId,
          item.quantity,
          item.unitPrice,
          item.totalPrice
        );

        return OrderItemMapper.toPersistence(itemWithOrderId);
      });

      await SeqOrderItem.bulkCreate(orderItemsData);
    }

    // Загрузить заказ с элементами
    const orderWithItems = await SeqOrder.findByPk(createdOrder.id, {
      include: [
        {
          model: SeqOrderItem,
          as: "orderItems",
          include: [
            {
              model: SeqProduct,
              as: "product",
            },
          ],
        },
      ],
    });

    if (!orderWithItems) {
      throw new Error("Order not found after creation");
    }

    return OrderMapper.toDomain(
      orderWithItems.get({ plain: true }) as SeqOrderWithRelations
    );
  }

  async findById(id: string): Promise<Order | null> {
    const order = await SeqOrder.findByPk(id, {
      include: [
        {
          model: SeqOrderItem,
          as: "orderItems",
          include: [
            {
              model: SeqProduct,
              as: "product",
            },
          ],
        },
        {
          model: SeqCart,
          as: "cart",
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
        },
      ],
    });

    if (!order) {
      return null;
    }

    return OrderMapper.toDomain(
      order.get({ plain: true }) as SeqOrderWithRelations
    );
  }

  async findByUserId(userId: string): Promise<Order[]> {
    const orders = await SeqOrder.findAll({
      where: { userId },
      include: [
        {
          model: SeqOrderItem,
          as: "orderItems",
          include: [
            {
              model: SeqProduct,
              as: "product",
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    return orders.map((order) =>
      OrderMapper.toDomain(order.get({ plain: true }) as SeqOrderWithRelations)
    );
  }

  async update(order: Order): Promise<Order> {
    if (!order.id) {
      throw new Error("Order ID is required for update");
    }

    const existingOrder = await SeqOrder.findByPk(order.id);

    if (!existingOrder) {
      throw new Error(`Order with id ${order.id} not found`);
    }

    // Обновить заказ
    const orderData = OrderMapper.toPersistence(order);
    await existingOrder.update(orderData);

    // Обновить элементы заказа (удалить старые и создать новые)
    await SeqOrderItem.destroy({ where: { orderId: order.id } });

    if (order.items && order.items.length > 0) {
      const orderItemsData = order.items.map((item) => {
        // Создать OrderItem с установленным orderId для сохранения
        const itemWithOrderId = new OrderItem(
          item.id,
          order.id, // Установить orderId
          item.productId,
          item.quantity,
          item.unitPrice,
          item.totalPrice
        );

        return OrderItemMapper.toPersistence(itemWithOrderId);
      });

      await SeqOrderItem.bulkCreate(orderItemsData);
    }

    // Загрузить обновленный заказ с элементами
    const updatedOrder = await SeqOrder.findByPk(order.id, {
      include: [
        {
          model: SeqOrderItem,
          as: "orderItems",
          include: [
            {
              model: SeqProduct,
              as: "product",
            },
          ],
        },
      ],
    });

    if (!updatedOrder) {
      throw new Error("Order not found after update");
    }

    return OrderMapper.toDomain(
      updatedOrder.get({ plain: true }) as SeqOrderWithRelations
    );
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order> {
    const order = await SeqOrder.findByPk(id);

    if (!order) {
      throw new Error(`Order with id ${id} not found`);
    }

    await order.update({ status });

    // Загрузить обновленный заказ с элементами
    const updatedOrder = await SeqOrder.findByPk(id, {
      include: [
        {
          model: SeqOrderItem,
          as: "orderItems",
          include: [
            {
              model: SeqProduct,
              as: "product",
            },
          ],
        },
      ],
    });

    if (!updatedOrder) {
      throw new Error("Order not found after status update");
    }

    return OrderMapper.toDomain(
      updatedOrder.get({ plain: true }) as SeqOrderWithRelations
    );
  }

  async delete(id: string): Promise<void> {
    // Удалить элементы заказа
    await SeqOrderItem.destroy({ where: { orderId: id } });

    // Удалить заказ
    await SeqOrder.destroy({ where: { id } });
  }
}
