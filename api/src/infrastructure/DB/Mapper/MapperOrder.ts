import { Order, type OrderItem } from "../../../core/models/Order/Order.js";
import type { SeqOrderAttributes } from "../ORM/SeqModel/SeqOrderModel.js";
import type { SeqItemAttributes } from "../ORM/SeqModel/SeqItemRepository.js";
import type { SeqProductWithRelations } from "./MapperProduct.js";
import type { SeqCartWithRelations } from "./MapperCart.js";

export type SeqOrderWithRelations = SeqOrderAttributes & {
  cart?: SeqCartWithRelations;
  cartItems?: (SeqItemAttributes & { product?: SeqProductWithRelations })[];
};

export class OrderMapper {
  static toDomain(raw: SeqOrderWithRelations): Order {
    const relatedItems = raw.cartItems ?? raw.cart?.items ?? [];

    const items: OrderItem[] = relatedItems.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      unitPrice: Number(item.price),
    }));

    return new Order(
      raw.id,
      raw.userId,
      items,
      raw.status,
      Number(raw.totalAmount),
      raw.addressId ?? undefined,
      raw.cartId ?? undefined
    );
  }

  static toPersistence(order: Order): Omit<SeqOrderAttributes, "id"> {
    return {
      userId: order.userId,
      status: order.status,
      totalAmount: order.totalAmount,
      addressId: order.addressId ?? null,
      cartId: order.cartId ?? null,
    };
  }
}
