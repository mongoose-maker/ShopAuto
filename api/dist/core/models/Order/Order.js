import { Cart } from "../Cart/Cart";
import { CartItem } from "../CartItem/CartItem";
import { User } from "../User/User";
export class Order {
    id;
    userStatus;
    cart;
    listOrder;
    orderStatus;
    constructor(id, userStatus, // Нужен для проверки роли Админ видит все заказы, пользователь только свои
    cart, listOrder, orderStatus) {
        this.id = id;
        this.userStatus = userStatus;
        this.cart = cart;
        this.listOrder = listOrder;
        this.orderStatus = orderStatus;
    }
}
//# sourceMappingURL=Order.js.map