import { Cart } from "../../../models/Cart/Cart";
import { Product } from "../../../models/Product/Product";
import { User } from "../../../models/User/User";
export class AddOrderDto {
    quantityItem;
    priceItemOrder;
    dataBayer;
    constructor(quantityItem, priceItemOrder, dataBayer) {
        this.quantityItem = quantityItem;
        this.priceItemOrder = priceItemOrder;
        this.dataBayer = dataBayer;
    }
}
//# sourceMappingURL=addOrderDto.js.map