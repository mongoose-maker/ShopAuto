import { OrderItem } from './OrderItem.js';
export const ORDER_STATUSES = ['created', 'paid', 'processing', 'sent', 'delivered'];
export class Order {
    constructor(id, userId, items, status, totalAmount, shippingAddressId, cartId) {
        this.id = id;
        this.userId = userId;
        this.items = items;
        this.status = status;
        this.totalAmount = totalAmount;
        this.shippingAddressId = shippingAddressId;
        this.cartId = cartId;
    }
} // ?
//   static calculateTotal(items: OrderItem[]): number {
//     return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
//   }
// } // ?
//# sourceMappingURL=Order.js.map