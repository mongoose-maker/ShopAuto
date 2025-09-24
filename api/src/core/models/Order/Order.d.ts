import { Cart } from "../Cart/Cart";
import { CartItem } from "../CartItem/CartItem";
import { User } from "../User/User";
export declare class Order {
    readonly id: string;
    readonly userStatus: User;
    readonly cart: Cart;
    readonly listOrder: CartItem;
    readonly orderStatus: "created" | "paid" | "processing" | "sent" | "delivered";
    constructor(id: string, userStatus: User, // Нужен для проверки роли Админ видит все заказы, пользователь только свои
    cart: Cart, listOrder: CartItem, orderStatus: "created" | "paid" | "processing" | "sent" | "delivered");
}
//# sourceMappingURL=Order.d.ts.map