import { OrderItem } from "../../../core/models/Order/OrderItem.js";
import type { SeqOrderItemAttributes } from "../ORM/SeqModel/SeqOrderItemModel.js";
import type { SeqProductWithRelations } from "./MapperProduct.js";
export type SeqOrderItemWithRelations = SeqOrderItemAttributes & {
    product?: SeqProductWithRelations;
};
export declare class OrderItemMapper {
    static toDomain(raw: SeqOrderItemWithRelations): OrderItem;
    static toPersistence(orderItem: OrderItem): Omit<SeqOrderItemAttributes, "id">;
}
//# sourceMappingURL=MapperOrderItem.d.ts.map