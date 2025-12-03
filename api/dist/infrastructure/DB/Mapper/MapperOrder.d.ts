import { Order } from "../../../core/models/Order/Order.js";
import type { SeqOrderAttributes } from "../ORM/SeqModel/SeqOrderModel.js";
import type { SeqItemAttributes } from "../ORM/SeqModel/SeqItemRepository.js";
import type { SeqProductWithRelations } from "./MapperProduct.js";
import type { SeqCartWithRelations } from "./MapperCart.js";
import type { SeqOrderItemWithRelations } from "./MapperOrderItem.js";
export type SeqOrderWithRelations = SeqOrderAttributes & {
    cart?: SeqCartWithRelations;
    cartItems?: (SeqItemAttributes & {
        product?: SeqProductWithRelations;
    })[];
    orderItems?: SeqOrderItemWithRelations[];
};
export declare class OrderMapper {
    static toDomain(raw: SeqOrderWithRelations): Order;
    static toPersistence(order: Order): Omit<SeqOrderAttributes, "id">;
}
//# sourceMappingURL=MapperOrder.d.ts.map