import { OrderItem } from "./OrderItem.js";

export const ORDER_STATUSES = [
  "created",
  "paid",
  "processing",
  "sent",
  "delivered",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number]; // ?
export class Order {
  constructor(
    readonly id: string | undefined,
    readonly userId: string,
    readonly items: OrderItem[],
    readonly status: OrderStatus,
    readonly totalAmount: number,
    readonly shippingAddressId?: string,
    readonly cartId?: string
  ) {}
} // ?

//   static calculateTotal(items: OrderItem[]): number {
//     return items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
//   }
// } // ?
