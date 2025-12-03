import { Order, ORDER_STATUSES } from "../models/Order/Order.js";
import type { OrderRepository } from "../repositories/OrderRepository/OrderRepository.js";
import type { AddOrderDto } from "../repositories/OrderRepository/dto/addOrderDto.js";
import type { UpdateOrderDto } from "../repositories/OrderRepository/dto/updateOrderDto.js";
import type { ProductRepository } from "../repositories/ProductRepository/ProductRepository.js";
import type { CartRepository } from "../repositories/CartRepository/CartRepository.js";
export declare class OrderService {
    private readonly orderRepository;
    private readonly productRepository;
    private readonly cartRepository;
    constructor(orderRepository: OrderRepository, productRepository: ProductRepository, cartRepository: CartRepository);
    createOrder(dto: AddOrderDto): Promise<Order>;
    getOrderById(id: string): Promise<Order | null>;
    getOrdersByUserId(userId: string): Promise<Order[]>;
    updateOrderStatus(id: string, status: (typeof ORDER_STATUSES)[number]): Promise<Order>;
    updateOrder(dto: UpdateOrderDto): Promise<Order>;
    deleteOrder(id: string): Promise<void>;
}
//# sourceMappingURL=OrderService.d.ts.map