import { CartItem } from "../../../models/CartItem/CartItem";
import { Product } from "../../../models/Product/Product";
export class UpdateCartDto {
    quantity;
    idProduct;
    constructor(quantity, idProduct) {
        this.quantity = quantity;
        this.idProduct = idProduct;
    } // ?  или cart
}
//# sourceMappingURL=updateCartDto.js.map