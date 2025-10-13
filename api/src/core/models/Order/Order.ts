import { Cart } from "../Cart/Cart.js";
import { CartItem } from "../CartItem/CartItem.js";
import { User } from "../User/User.js";

export class Order {
  constructor(
    readonly id: string,
    readonly userStatus: User, // Нужен для проверки роли Админ видит все заказы, пользователь только свои
    readonly cart: Cart,
    readonly listOrder: CartItem,
    readonly orderStatus:
      | "created"
      | "paid"
      | "processing"
      | "sent"
      | "delivered"
  ) {}
}
