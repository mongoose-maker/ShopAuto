import type { OrderRepository } from "../../../../core/repositories/OrderRepository/OrderRepository.js";
import { Order, type OrderStatus } from "../../../../core/models/Order/Order.js";
export declare class SeqOrderRepository implements OrderRepository {
    save(order: Order): Promise<Order>;
    findById(id: string): Promise<Order | null>;
    findByUserId(userId: string): Promise<Order[]>;
    update(order: Order): Promise<Order>;
    updateStatus(id: string, status: OrderStatus): Promise<Order>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=SeqOrderRepository.d.ts.map