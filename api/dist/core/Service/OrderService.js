import { Order, ORDER_STATUSES } from "../models/Order/Order.js";
import { OrderItem } from "../models/Order/OrderItem.js";
export class OrderService {
    constructor(orderRepository, productRepository, cartRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.cartRepository = cartRepository;
    }
    async createOrder(dto) {
        // Проверить наличие товаров
        if (!dto.items || dto.items.length === 0) {
            throw new Error("Order must contain at least one item");
        }
        // Проверить каждый товар и создать OrderItem
        const orderItems = [];
        let calculatedTotal = 0;
        for (const itemDto of dto.items) {
            // Проверить существование продукта
            const product = await this.productRepository.getProductById(itemDto.productId);
            if (!product) {
                throw new Error(`Product with id ${itemDto.productId} not found`);
            }
            // Проверить доступность продукта
            if (!product.availability) {
                throw new Error(`Product with id ${itemDto.productId} is not available`);
            }
            // Вычислить общую цену товара
            const unitPrice = itemDto.unitPrice ?? product.price;
            const totalPrice = unitPrice * itemDto.quantity;
            calculatedTotal += totalPrice;
            // Создать OrderItem (orderId будет установлен в репозитории)
            const orderItem = new OrderItem(undefined, undefined, // orderId будет установлен после создания заказа
            itemDto.productId, itemDto.quantity, unitPrice, totalPrice);
            orderItems.push(orderItem);
        }
        // Проверить соответствие суммы заказа
        if (Math.abs(calculatedTotal - dto.totalAmount) > 0.01) {
            throw new Error(`Total amount mismatch: calculated ${calculatedTotal}, provided ${dto.totalAmount}`);
        }
        // Создать заказ (id будет создан в репозитории)
        const order = new Order(undefined, // id будет создан в репозитории
        dto.userId, orderItems, "created", dto.totalAmount, dto.addressId, dto.cartId);
        // Сохранить заказ
        const savedOrder = await this.orderRepository.save(order);
        // Если заказ создан из корзины, очистить корзину
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
        // Проверить валидность статуса
        if (!ORDER_STATUSES.includes(status)) {
            throw new Error(`Invalid status: ${status}. Valid statuses: ${ORDER_STATUSES.join(", ")}`);
        }
        return await this.orderRepository.updateStatus(id, status);
    }
    async updateOrder(dto) {
        // Получить существующий заказ
        const existingOrder = await this.orderRepository.findById(dto.orderId);
        if (!existingOrder) {
            throw new Error(`Order with id ${dto.orderId} not found`);
        }
        // Обновить статус
        if (dto.status) {
            return await this.updateOrderStatus(dto.orderId, dto.status);
        }
        // Обновить адрес доставки, если указан
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