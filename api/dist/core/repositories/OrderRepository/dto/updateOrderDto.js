import { Cart } from "../../../models/Cart/Cart";
import { Product } from "../../../models/Product/Product";
export class UpdateOrderDto {
    quantityItem;
    priceItemOrder;
    constructor(quantityItem, priceItemOrder) {
        this.quantityItem = quantityItem;
        this.priceItemOrder = priceItemOrder;
    }
}
//# sourceMappingURL=updateOrderDto.js.map