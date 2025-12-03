import type { OrderItemRepository } from "../../../../core/repositories/OrderItem/OrderItemRepository.js";
import { OrderItem } from "../../../../core/models/Order/OrderItem.js";
export declare class SeqOrderItemRepository implements OrderItemRepository {
    createOrderItem(item: OrderItem): Promise<OrderItem>;
    findById(id: string): Promise<OrderItem | null>;
    findByOrderId(orderId: string): Promise<OrderItem | null>;
    updateOrderItemQuantity(orderId: string, productId: string, newQuantity: number): Promise<OrderItem | null>;
    deleteOrderItem(orderId: string): Promise<boolean>;
}
//# sourceMappingURL=SeqOrderItemRepository.d.ts.map