import { CartItem } from "../../../core/models/Cart/CartItem.js";
import type { SeqItemAttributes } from "../ORM/SeqModel/SeqItemRepository.js";
import type { SeqProductWithRelations } from "./MapperProduct.js";
type SeqItemWithRelations = SeqItemAttributes & {
    product?: SeqProductWithRelations;
};
export declare class ItemMapper {
    static toDomain(raw: SeqItemWithRelations): CartItem;
    static toPersistence(item: CartItem): Omit<SeqItemAttributes, "id">;
}
export {};
//# sourceMappingURL=MapperItem.d.ts.map