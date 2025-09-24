import { Order } from "../../models/Order/Order";
import { AddOrderDto } from "./dto/addOrderDto";
export interface OrderRepository {
    addOrder(id: string): Order;
    toCheckout(dto: AddOrderDto): Order;
}
//# sourceMappingURL=OrderRepository.d.ts.map