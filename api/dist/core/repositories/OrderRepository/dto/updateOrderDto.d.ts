import { Cart } from "../../../models/Cart/Cart";
import { Product } from "../../../models/Product/Product";
export declare class UpdateOrderDto {
    readonly quantityItem: Cart;
    readonly priceItemOrder: Product;
    constructor(quantityItem: Cart, priceItemOrder: Product);
}
//# sourceMappingURL=updateOrderDto.d.ts.map