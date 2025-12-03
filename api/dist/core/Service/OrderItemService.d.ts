import { OrderItem } from '../models/Order/OrderItem.js';
import type { OrderItemRepository } from '../repositories/OrderItem/OrderItemRepository.js';
import type { AddOrderItemDto } from '../repositories/OrderItem/dto/addOrderItemDto.js';
import type { UpdateOrderItemDto } from '../repositories/OrderItem/dto/updateOrderItemDto.js';
import type { ProductRepository } from '../repositories/ProductRepository/ProductRepository.js';
import type { OrderRepository } from '../repositories/OrderRepository/OrderRepository.js';
export declare class OrderItemService {
    private readonly orderItemRepository;
    private readonly productRepository;
    private readonly orderRepository;
    constructor(orderItemRepository: OrderItemRepository, productRepository: ProductRepository, orderRepository: OrderRepository);
    createOrderItem(orderId: string, dto: AddOrderItemDto): Promise<OrderItem>;
    getOrderItemById(id: string): Promise<OrderItem | null>;
    getOrderItemByOrderId(orderId: string): Promise<OrderItem | null>;
    updateOrderItemQuantity(orderId: string, productId: string, newQuantity: number): Promise<OrderItem | null>;
    updateOrderItem(orderId: string, productId: string, dto: UpdateOrderItemDto): Promise<OrderItem | null>;
    deleteOrderItem(orderId: string): Promise<boolean>;
}
//# sourceMappingURL=OrderItemService.d.ts.map