import { OrderItem } from "../../../core/models/Order/OrderItem.js";
import type { SeqOrderItemAttributes } from "../ORM/SeqModel/SeqOrderItemModel.js";
import type { SeqProductWithRelations } from "./MapperProduct.js";

export type SeqOrderItemWithRelations = SeqOrderItemAttributes & {
  product?: SeqProductWithRelations;
};

export class OrderItemMapper {
  static toDomain(raw: SeqOrderItemWithRelations): OrderItem {
    if (!raw.orderId) throw new Error("Order ID is required for OrderItem");
    if (!raw.productId) throw new Error("Product ID is required for OrderItem");

    return new OrderItem(
      raw.id,
      raw.orderId,
      raw.productId,
      raw.quantity,
      Number(raw.unitPrice),
      Number(raw.totalPrice)
    );
  }

  static toPersistence(
    orderItem: OrderItem
  ): Omit<SeqOrderItemAttributes, "id"> {
    if (!orderItem.orderId) throw new Error("Order ID is required");
    if (!orderItem.productId) throw new Error("Product ID is required");

    return {
      orderId: orderItem.orderId,
      productId: orderItem.productId,
      quantity: orderItem.quantity,
      unitPrice: orderItem.unitPrice,
      totalPrice: orderItem.totalPrice,
    };
  }
}
