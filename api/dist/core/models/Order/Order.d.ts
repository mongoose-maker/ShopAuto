import { OrderItem } from './OrderItem.js';
export declare const ORDER_STATUSES: readonly ["created", "paid", "processing", "sent", "delivered"];
export type OrderStatus = (typeof ORDER_STATUSES)[number];
export declare class Order {
    readonly id: string | undefined;
    readonly userId: string;
    readonly items: OrderItem[];
    readonly status: OrderStatus;
    readonly totalAmount: number;
    readonly shippingAddressId?: string | undefined;
    readonly cartId?: string | undefined;
    constructor(id: string | undefined, userId: string, items: OrderItem[], status: OrderStatus, totalAmount: number, shippingAddressId?: string | undefined, cartId?: string | undefined);
}
//# sourceMappingURL=Order.d.ts.map