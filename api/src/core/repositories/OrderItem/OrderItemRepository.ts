import type { OrderItem } from "../../models/Order/OrderItem.js";

export interface OrderItemRepository {
  createOrderItem(item: OrderItem): Promise<OrderItem>;
  findById(id: string): Promise<OrderItem | null>;
  findByOrderId(orderId: string): Promise<OrderItem | null>;
  updateOrderItemQuantity(
    orderId: string,
    productId: string,
    newQuantity: number
    // unitPrice: number
  ): Promise<OrderItem | null>;
  deleteOrderItem(orderId: string): Promise<boolean>;
}
