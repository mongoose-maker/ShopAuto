import { Order, type OrderStatus } from '../../models/Order/Order.js';
export interface OrderRepository {
    save(order: Order): Promise<Order>;
    findById(id: string): Promise<Order | null>;
    findByUserId(userId: string): Promise<Order[]>;
    update(order: Order): Promise<Order>;
    updateStatus(id: string, status: OrderStatus): Promise<Order>;
    delete(id: string): Promise<void>;
}
//# sourceMappingURL=OrderRepository.d.ts.map