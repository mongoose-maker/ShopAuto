import { Product } from '../Product/Product.js';
export class CartItem {
    constructor(id, cartId, productId, quantity, product) {
        this.id = id;
        this.cartId = cartId;
        this.productId = productId;
        this.quantity = quantity;
        this.product = product;
    }
}
//# sourceMappingURL=CartItem.js.map