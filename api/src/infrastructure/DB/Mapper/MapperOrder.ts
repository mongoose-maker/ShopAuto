import { Order } from '../../../core/models/Order/Order.js';
import { OrderItem } from '../../../core/models/Order/OrderItem.js';
import type { SeqOrderAttributes } from '../ORM/SeqModel/SeqOrderModel.js';
import type { SeqItemAttributes } from '../ORM/SeqModel/SeqItemRepository.js';
import type { SeqProductWithRelations } from './MapperProduct.js';
import type { SeqCartWithRelations } from './MapperCart.js';
import type { SeqOrderItemWithRelations } from './MapperOrderItem.js';
import { OrderItemMapper } from './MapperOrderItem.js';

export type SeqOrderWithRelations = SeqOrderAttributes & {
  cart?: SeqCartWithRelations;
  cartItems?: (SeqItemAttributes & { product?: SeqProductWithRelations })[];
  orderItems?: SeqOrderItemWithRelations[];
};

export class OrderMapper {
  static toDomain(raw: SeqOrderWithRelations): Order {
    if (raw.orderItems && raw.orderItems.length > 0) {
      const items: OrderItem[] = raw.orderItems.map(item => OrderItemMapper.toDomain(item));

      return new Order(
        raw.id,
        raw.userId,
        items,
        raw.status,
        Number(raw.totalAmount),
        raw.shippingAddressId ?? undefined,
        raw.cartId ?? undefined,
      );
    }

    const relatedItems = raw.cartItems ?? raw.cart?.items ?? [];

    const items: OrderItem[] = relatedItems.map(item => {
      const unitPrice = Number(item.price);
      const quantity = item.quantity;
      const totalPrice = unitPrice * quantity;

      return new OrderItem(undefined, raw.id, item.productId, quantity, unitPrice, totalPrice);
    });

    return new Order(
      raw.id,
      raw.userId,
      items,
      raw.status,
      Number(raw.totalAmount),
      raw.shippingAddressId ?? undefined,
      raw.cartId ?? undefined,
    );
  }

  static toPersistence(order: Order): Omit<SeqOrderAttributes, 'id'> {
    return {
      userId: order.userId,
      status: order.status,
      totalAmount: order.totalAmount,
      shippingAddressId: order.shippingAddressId ?? null,
      cartId: order.cartId ?? null,
    };
  }
}
