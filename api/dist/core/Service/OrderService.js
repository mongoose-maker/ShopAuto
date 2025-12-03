import { Order, ORDER_STATUSES } from '../models/Order/Order.js';
import { OrderItem } from '../models/Order/OrderItem.js';
export class OrderService {
    constructor(orderRepository, productRepository, cartRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.cartRepository = cartRepository;
    }
    async createOrder(dto) {
        if (!dto.items || dto.items.length === 0) {
            throw new Error('Order must contain at least one item');
        }
        const orderItems = [];
        let calculatedTotal = 0;
        for (const itemDto of dto.items) {
            const product = await this.productRepository.getProductById(itemDto.productId);
            if (!product) {
                throw new Error(`Product with id ${itemDto.productId} not found`);
            }
            if (!product.availability) {
                throw new Error(`Product with id ${itemDto.productId} is not available`);
            }
            const unitPrice = itemDto.unitPrice ?? product.price;
            const totalPrice = unitPrice * itemDto.quantity;
            calculatedTotal += totalPrice;
            const orderItem = new OrderItem(undefined, undefined, itemDto.productId, itemDto.quantity, unitPrice, totalPrice);
            orderItems.push(orderItem);
        }
        if (Math.abs(calculatedTotal - dto.totalAmount) > 0.01) {
            throw new Error(`Total amount mismatch: calculated ${calculatedTotal}, provided ${dto.totalAmount}`);
        }
        const order = new Order(undefined, dto.userId, orderItems, 'created', dto.totalAmount, dto.addressId, dto.cartId);
        const savedOrder = await this.orderRepository.save(order);
        if (dto.cartId) {
            const cart = await this.cartRepository.getByUserId(dto.userId);
            if (cart && cart.id === dto.cartId) {
                await this.cartRepository.clear(dto.userId);
            }
        }
        return savedOrder;
    }
    async getOrderById(id) {
        return await this.orderRepository.findById(id);
    }
    async getOrdersByUserId(userId) {
        return await this.orderRepository.findByUserId(userId);
    }
    async updateOrderStatus(id, status) {
        if (!ORDER_STATUSES.includes(status)) {
            throw new Error(`Invalid status: ${status}. Valid statuses: ${ORDER_STATUSES.join(', ')}`);
        }
        return await this.orderRepository.updateStatus(id, status);
    }
    async updateOrder(dto) {
        const existingOrder = await this.orderRepository.findById(dto.orderId);
        if (!existingOrder) {
            throw new Error(`Order with id ${dto.orderId} not found`);
        }
        if (dto.status) {
            return await this.updateOrderStatus(dto.orderId, dto.status);
        }
        if (dto.addressId !== undefined) {
            const updatedOrder = new Order(existingOrder.id, existingOrder.userId, existingOrder.items, existingOrder.status, existingOrder.totalAmount, dto.addressId, existingOrder.cartId);
            return await this.orderRepository.update(updatedOrder);
        }
        return existingOrder;
    }
    async deleteOrder(id) {
        await this.orderRepository.delete(id);
    }
}
//# sourceMappingURL=OrderService.js.map