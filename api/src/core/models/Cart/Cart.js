import { CartItem } from "../CartItem/CartItem";
export class Cart {
    id;
    userId;
    item;
    constructor(id, userId, item = [] // ?
    ) {
        this.id = id;
        this.userId = userId;
        this.item = item;
    }
}
//# sourceMappingURL=Cart.js.map