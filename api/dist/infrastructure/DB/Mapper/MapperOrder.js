import { Order } from "../../../core/models/Order/Order.js";
import { OrderItem } from "../../../core/models/Order/OrderItem.js";
import { OrderItemMapper } from "./MapperOrderItem.js";
export class OrderMapper {
    static toDomain(raw) {
        // Если есть orderItems (уже сохраненные элементы заказа), используем их
        if (raw.orderItems && raw.orderItems.length > 0) {
            const items = raw.orderItems.map((item) => OrderItemMapper.toDomain(item));
            return new Order(raw.id, raw.userId, items, raw.status, Number(raw.totalAmount), raw.shippingAddressId ?? undefined, raw.cartId ?? undefined);
        }
        // Иначе создаем OrderItem из cartItems (при создании заказа из корзины)
        const relatedItems = raw.cartItems ?? raw.cart?.items ?? [];
        const items = relatedItems.map((item) => {
            const unitPrice = Number(item.price);
            const quantity = item.quantity;
            const totalPrice = unitPrice * quantity;
            return new OrderItem(undefined, // id будет создан при сохранении
            raw.id, // orderId
            item.productId, quantity, unitPrice, totalPrice);
        });
        return new Order(raw.id, raw.userId, items, raw.status, Number(raw.totalAmount), raw.shippingAddressId ?? undefined, raw.cartId ?? undefined);
    }
    static toPersistence(order) {
        return {
            userId: order.userId,
            status: order.status,
            totalAmount: order.totalAmount,
            shippingAddressId: order.shippingAddressId ?? null,
            cartId: order.cartId ?? null,
        };
    }
}
//# sourceMappingURL=MapperOrder.js.map