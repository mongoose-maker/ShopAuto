import { Cart } from "../../../models/Cart/Cart";
import { Product } from "../../../models/Product/Product";
import { User } from "../../../models/User/User";
export declare class AddOrderDto {
    readonly quantityItem: Cart;
    readonly priceItemOrder: Product;
    readonly dataBayer: User;
    constructor(quantityItem: Cart, priceItemOrder: Product, dataBayer: User);
}
//# sourceMappingURL=addOrderDto.d.ts.map