import { CartItem } from "../../../models/CartItem/CartItem";
import { Product } from "../../../models/Product/Product";
export declare class UpdateCartDto {
    readonly quantity: CartItem;
    readonly idProduct: Product;
    constructor(quantity: CartItem, idProduct: Product);
}
//# sourceMappingURL=updateCartDto.d.ts.map