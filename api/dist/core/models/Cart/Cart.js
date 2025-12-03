import { CartItem } from './CartItem.js';
export class Cart {
    constructor(id, userId, items = []) {
        this.id = id;
        this.userId = userId;
        this.items = items;
    }
}
//# sourceMappingURL=Cart.js.map